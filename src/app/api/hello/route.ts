export async function GET(request: Request) {
  const output = {
    message: 'Hello, Next.js!'
  }
  return new Response(JSON.stringify(output), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  console.log('body', body)
  const output = {
    message: 'Hello, Next.js!'
  }
  return new Response(JSON.stringify(output), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
