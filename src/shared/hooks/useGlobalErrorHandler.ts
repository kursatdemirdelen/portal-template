/**
 * Global Error Handler Hook
 * ==========================
 * 
 * API errors ve auth events'ları globally handle eder
 * Toast/Notification gösterir
 */

import { useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

/**
 * Mount et ve tüm global error events'ları dinle
 */
export const useGlobalErrorHandler = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    /**
     * 401: Token geçersiz/expired - API interceptor'dan
     */
    const handleUnauthorized = () => {
      logout();
      message.error('Oturumunuz sonlandırıldı. Lütfen giriş yapınız.');
      navigate('/login', { replace: true });
    };

    /**
     * 403: Yetkisiz erişim
     */
    const handleForbidden = () => {
      message.error('Bu işlemi gerçekleştirme yetkiniz yok.');
    };

    /**
     * 500: Server hatası
     */
    const handleServerError = () => {
      message.error('Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.');
    };

    // Event listeners
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    window.addEventListener('api:forbidden', handleForbidden);
    window.addEventListener('api:serverError', handleServerError);

    // Cleanup
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
      window.removeEventListener('api:forbidden', handleForbidden);
      window.removeEventListener('api:serverError', handleServerError);
    };
  }, [navigate, logout]);
};

export default useGlobalErrorHandler;
