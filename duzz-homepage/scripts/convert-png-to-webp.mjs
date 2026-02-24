import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const PROJECTS_DIR = path.resolve('public/projects')
const TARGET_DIRS = ['PL8A1NKR', 'SX2J7EKV', 'ZE4T2YBQ', 'T9RJ6VHS', 'UB9P1HXL']

async function main() {
  let totalOriginal = 0
  let totalConverted = 0
  let fileCount = 0

  for (const dir of TARGET_DIRS) {
    const dirPath = path.join(PROJECTS_DIR, dir)
    const pngFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.png'))

    console.log(`\n[${dir}]`)

    for (const pngFile of pngFiles) {
      const pngPath = path.join(dirPath, pngFile)
      const webpPath = path.join(dirPath, pngFile.replace('.png', '.webp'))
      const originalSize = fs.statSync(pngPath).size

      const webpBuffer = await sharp(pngPath)
        .webp({ quality: 80 })
        .toBuffer()

      fs.writeFileSync(webpPath, webpBuffer)

      const reduction = ((1 - webpBuffer.length / originalSize) * 100).toFixed(1)
      console.log(`  ${pngFile} → ${pngFile.replace('.png', '.webp')}: ${(originalSize / 1024).toFixed(0)}KB → ${(webpBuffer.length / 1024).toFixed(0)}KB (-${reduction}%)`)

      totalOriginal += originalSize
      totalConverted += webpBuffer.length
      fileCount++
    }
  }

  console.log(`\n=== Summary ===`)
  console.log(`Files converted: ${fileCount}`)
  console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB`)
  console.log(`WebP total: ${(totalConverted / 1024 / 1024).toFixed(1)}MB`)
  console.log(`Reduction: ${((1 - totalConverted / totalOriginal) * 100).toFixed(1)}%`)
}

main().catch(console.error)
