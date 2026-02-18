// ============================================================
// Google Apps Script - DUZZ 문의 접수 이메일 발송
// ============================================================
// 사용법:
// 1. https://script.google.com 접속 (support@teamduzz.com 계정)
// 2. 새 프로젝트 생성
// 3. 아래 코드를 붙여넣기
// 4. [배포] → [새 배포] → 유형: 웹 앱
//    - 실행 주체: 본인
//    - 액세스 권한: 모든 사용자
// 5. 배포 후 나오는 URL을 복사
// 6. .env 파일의 VITE_CONTACT_API_URL에 붙여넣기
//
// ★ 코드 수정 후 반드시 [배포 → 배포 관리 → 연필 아이콘 → 버전: 새 버전 → 배포] 해야 반영됨
// ============================================================

const ADMIN_EMAIL = 'support@teamduzz.com';

function doPost(e) {
  var adminOk = false;
  var confirmOk = false;
  var errors = [];

  try {
    var data = JSON.parse(e.postData.contents);
    Logger.log('수신 데이터: ' + JSON.stringify(data));

    // 1) 관리자에게 문의 내용 발송
    try {
      sendToAdmin(data);
      adminOk = true;
      Logger.log('관리자 메일 발송 성공');
    } catch (err1) {
      errors.push('관리자 메일 실패: ' + err1.message);
      Logger.log('관리자 메일 실패: ' + err1.message);
    }

    // 2) 문의자에게 접수 확인 메일 발송
    try {
      sendConfirmation(data);
      confirmOk = true;
      Logger.log('확인 메일 발송 성공: ' + data.email);
    } catch (err2) {
      errors.push('확인 메일 실패: ' + err2.message);
      Logger.log('확인 메일 실패: ' + err2.message);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        success: adminOk,
        adminOk: adminOk,
        confirmOk: confirmOk,
        errors: errors
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log('전체 오류: ' + err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 관리자 알림 메일
function sendToAdmin(data) {
  var subject = '[DUZZ 문의] ' + (data.company || '개인') + ' - ' + data.name;

  var body = '새로운 프로젝트 문의가 접수되었습니다.\n\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '■ 문의자 정보\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '이름: ' + data.name + '\n'
    + '회사명: ' + (data.company || '-') + '\n'
    + '연락처: ' + data.phone + '\n'
    + '이메일: ' + data.email + '\n\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '■ 프로젝트 정보\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '프로젝트 유형: ' + data.projectType + '\n'
    + '예산 범위: ' + (data.budget || '미정') + '\n\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '■ 상세 내용\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + data.detail + '\n\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '접수 시각: ' + new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    body: body,
  });
}

// 문의자 접수 확인 메일
function sendConfirmation(data) {
  var subject = '[DUZZ] 프로젝트 문의가 접수되었습니다';

  var body = data.name + '님, 안녕하세요.\n'
    + 'DUZZ에 프로젝트 문의를 주셔서 감사합니다.\n\n'
    + '아래 내용으로 문의가 정상 접수되었습니다.\n\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
    + '프로젝트 유형: ' + data.projectType + '\n'
    + '예산 범위: ' + (data.budget || '미정') + '\n'
    + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n'
    + '24시간 내 담당자가 확인 후 연락드리겠습니다.\n'
    + '긴급한 문의는 아래 연락처로 연락 부탁드립니다.\n\n'
    + '전화: 010-3329-9041\n'
    + '이메일: support@teamduzz.com\n\n'
    + '감사합니다.\n'
    + 'DUZZ 드림';

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    body: body,
    replyTo: ADMIN_EMAIL,
  });
}

// GET 요청 테스트용
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'DUZZ Contact API is running.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 수동 테스트용 (편집기에서 실행)
function testSend() {
  var testData = {
    name: '테스트',
    company: '테스트 회사',
    phone: '010-0000-0000',
    email: ADMIN_EMAIL,
    projectType: '홈페이지 개발',
    budget: '500만원 미만',
    detail: '테스트 문의입니다.'
  };
  sendToAdmin(testData);
  sendConfirmation(testData);
  Logger.log('테스트 완료');
}
