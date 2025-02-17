const cookieOptions = {
    httpOnly: true,
    secure: false, //Change it to true in production (HTTPS Required)
    sameSite: 'Lax',
    maxAge: 2 * 24 * 60 * 60 * 1000,
}

export default cookieOptions
