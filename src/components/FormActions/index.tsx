import * as React from 'react';
import Box from '@material-ui/core/Box';

import Button, { ButtonProps } from '../Button';

interface FormActionsProps {
  actions: ButtonProps[];
}

const FormActions = ({ actions }: FormActionsProps): React.ReactElement => (
  <Box display='flex' justifyContent='flex-end'>
    {actions.map(
      ({ className, children, ...rest }: ButtonProps, index: number) => (
        <Button key={index} className={className} {...rest}>
          {children}
        </Button>
      )
    )}
  </Box>
);

export default FormActions;
