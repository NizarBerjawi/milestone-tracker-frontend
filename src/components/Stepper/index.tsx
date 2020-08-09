import * as React from 'react';
import MuiStepper, { StepperProps as MuiStepperProps} from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

interface StepperProps extends MuiStepperProps {
  steps: string[];
}

const Stepper: React.FC<StepperProps> = (
  props: React.PropsWithChildren<StepperProps>
) => {
  const { steps, ...rest } = props;

  return (
    <React.Fragment>
      <MuiStepper {...rest}>
        {steps.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
      {props.children}
    </React.Fragment>
  );
};

export default Stepper;
