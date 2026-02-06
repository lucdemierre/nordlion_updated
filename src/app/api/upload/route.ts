import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // In production, upload to S3 or cloud storage
    // For now, save to public/uploads
    const filename = `${Date.now()}-${file.name}`
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename)

    await writeFile(filepath, buffer)

    return NextResponse.json({
      success: true,
      data: {
        filename,
        url: `/uploads/${filename}`,
        size: file.size,
        type: file.type,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'File upload failed' },
      { status: 500 }
    )
  }
}
