'use client'

import { ReactNode } from 'react';
import { AuthProvider } from './components/utils/authContext';
import { SelectedProvider } from './components/utils/selectedContext';
import { Layout } from './components';



interface HomeProps {
  children: ReactNode;
}

export default function Home({ children }: HomeProps) {
  return (
    <AuthProvider>
      <SelectedProvider>
        <Layout>
          {children}
        </Layout>
      </SelectedProvider>
    </AuthProvider>
  )
}
