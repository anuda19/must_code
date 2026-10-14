// app/actions/auth.ts
'use server';

import { handleAction } from '@/lib/action-handler';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string };
}

interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name?: string };
}

export async function loginAction(formData: FormData) {
  return handleAction(async () => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // 1. Call login endpoint (res is already parsed LoginResponse)
    const res = await api.post<LoginResponse>('/auth/login', { email, password });

    // 2. Set HttpOnly Cookie for Refresh Token
    const cookieStore = await cookies();
    cookieStore.set('refreshToken', res.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    cookieStore.set('accessToken', res.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60, // 15 minutes
    });

    // 3. Return accessToken & user
    return {
      accessToken: res.accessToken,
      user: res.user,
    };
  });
}

export async function logoutAction() {
  return handleAction(async () => {
    const cookieStore = await cookies();

    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Backend logout request failed:', error);
    }

    cookieStore.delete('refreshToken');
    cookieStore.delete('accessToken');

    return { success: true };
  });
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export async function registerAction(data: RegisterInput) {
  return handleAction(async () => {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    // 1. Call register endpoint
    const res = await api.post<RegisterResponse>('/auth/register', {
      name,
      email,
      password,
    });

    // 2. Set HttpOnly Cookie for Refresh Token
    const cookieStore = await cookies();
    cookieStore.set('refreshToken', res.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    // 3. Return accessToken & user
    return {
      accessToken: res.accessToken,
      user: res.user,
    };
  });
}