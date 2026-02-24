import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const PROJECTS_DIR = path.resolve('public/projects')
const MIN_SIZE = 1000 // Skip placeholder files under 1KB

async function extractPngFromSvg(svgPath) {
  const content = fs.readFileSync(svgPath, 'utf-8')
  const match = content.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/)
  if (!match) return null
  return Buffer.from(match[1], 'base64')
}

async function convertFile(svgPath, webpPath) {
  const stat = fs.statSync(svgPath)
  if (stat.size < MIN_SIZE) {
    console.log(`  SKIP (placeholder): ${path.basename(svgPath)} (${stat.size} bytes)`)
    return false
  }

  const pngBuffer = await extractPngFromSvg(svgPath)
  if (!pngBuffer) {
    console.log(`  SKIP (no embedded PNG): ${path.basename(svgPath)}`)
    return false
  }

  const webpBuffer = await sharp(pngBuffer)
    .webp({ quality: 80 })
    .toBuffer()

  fs.writeFileSync(webpPath, webpBuffer)

  const reduction = ((1 - webpBuffer.length / stat.size) * 100).toFixed(1)
  console.log(`  ${path.basename(svgPath)} → ${path.basename(webpPath)}: ${(stat.size / 1024).toFixed(0)}KB → ${(webpBuffer.length / 1024).toFixed(0)}KB (-${reduction}%)`)
  return true
}

async function main() {
  const dirs = fs.readdirSync(PROJECTS_DIR).filter(d =>
    fs.statSync(path.join(PROJECTS_DIR, d)).isDirectory()
  )

  let totalOriginal = 0
  let totalConverted = 0
  let fileCount = 0

  for (const dir of dirs) {
    const dirPath = path.join(PROJECTS_DIR, dir)
    const svgFiles = fs.readdirSync(dirPath).filter(f => f.endsWith('.svg'))

    if (svgFiles.length === 0) continue
    console.log(`\n[${dir}]`)

    for (const svgFile of svgFiles) {
      const svgPath = path.join(dirPath, svgFile)
      const webpPath = path.join(dirPath, svgFile.replace('.svg', '.webp'))

      const originalSize = fs.statSync(svgPath).size
      const converted = await convertFile(svgPath, webpPath)

      if (converted) {
        totalOriginal += originalSize
        totalConverted += fs.statSync(webpPath).size
        fileCount++
      }
    }
  }

  console.log(`\n=== Summary ===`)
  console.log(`Files converted: ${fileCount}`)
  console.log(`Original total: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB`)
  console.log(`WebP total: ${(totalConverted / 1024 / 1024).toFixed(1)}MB`)
  console.log(`Reduction: ${((1 - totalConverted / totalOriginal) * 100).toFixed(1)}%`)
}

main().catch(console.error)
