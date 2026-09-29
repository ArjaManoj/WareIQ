import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    return NextResponse.json({
      success: true,
      message: 'User permissions updated successfully',
      data: { _id: params.id, ...body },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update user' },
      { status: 500 }
    );
  }
}
