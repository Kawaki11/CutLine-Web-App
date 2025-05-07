import * as React from 'react';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { paths } from '@/paths';
import { DynamicLogo } from '@/components/core/logo';
import Image from 'next/image';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff',
        px: 15,
      }}
    >
      {/* Left: Login Form */}
      <Box
        sx={{
          flex: 1,
          maxWidth: 480,
          width: '100%',
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Box 
          component={RouterLink}
          href={paths.home} 
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <DynamicLogo colorDark="light" colorLight="dark" height={50} width={150} />
          </Box>
        </Box>
        {children}
      </Box>

      {/* Right: Logo */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
        }}
      >
        <Image
          src="/assets/logo.png"
          alt="Supremo Barber Logo"
          width={300}
          height={300}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Box>
    </Box>
  );
}
