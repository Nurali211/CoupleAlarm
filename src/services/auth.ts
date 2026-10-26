// Simulated OTP service. Replace bodies with real calls, e.g. POST /auth/otp/request and /auth/otp/verify.
export async function requestOtp(_contact: string): Promise<void> { await new Promise(r => setTimeout(r, 400)) }
export async function verifyOtp(_contact: string, code: string): Promise<boolean> { await new Promise(r => setTimeout(r, 400)); return code === '123456' }
