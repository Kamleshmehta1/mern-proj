import React from 'react';
import { FormProvider as Form } from 'react-hook-form';

function FormProvider({ methods, onSubmit, style, children, encType }) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} style={style} {...(encType && { encType })}>
        {children}
      </form>
    </Form>
  );
}

export default FormProvider;
