import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {
  SnackbarProvider as NotiSnackbarProvider,
  SnackbarProviderProps,
  SnackbarKey,
  ProviderContext,
} from 'notistack';
import { IconButton } from '@material-ui/core';

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
  ...rest
}: SnackbarProviderProps) => {
  const theme = useTheme();
  const notistackRef = React.createRef<ProviderContext>();

  const handleDismiss = (key: SnackbarKey): void => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <NotiSnackbarProvider
      ref={notistackRef}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      maxSnack={3}
      action={(key: SnackbarKey): React.ReactNode => (
        <IconButton onClick={(): void => handleDismiss(key)}>
          <CloseIcon htmlColor={theme.palette.common.white} />
        </IconButton>
      )}
      {...rest}
    >
      {children}
    </NotiSnackbarProvider>
  );
};

export default SnackbarProvider;
