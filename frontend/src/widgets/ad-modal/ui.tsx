import type { FormEvent } from 'react';

import { Button, Checkbox, Modal, Stack, Textarea } from '@mantine/core';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { Reason, ReasonLabels } from '@/shared/lib';

import { model } from './model';

export const AdModal = () => {
  const { fields } = useForm(model.form);
  const [formSubmit, isFormDirty, title, color, isOpened, setClosed] = useUnit([
    model.form.submit,
    model.form.$isDirty,
    model.$title,
    model.$color,
    model.$isOpened,
    model.setClosed
  ]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmit();
  };

  return (
    <Modal centered title={title} onClose={setClosed} opened={isOpened}>
      <form onSubmit={handleFormSubmit}>
        <Stack>
          <Checkbox
            checked={fields.wrongCategory.value}
            label={ReasonLabels[Reason.WrongCategory]}
            onChange={(e) => fields.wrongCategory.onChange(e.target.checked)}
          />
          <Checkbox
            checked={fields.badDescription.value}
            label={ReasonLabels[Reason.BadDescription]}
            onChange={(e) => fields.badDescription.onChange(e.target.checked)}
          />
          <Checkbox
            checked={fields.fraudSuspicion.value}
            label={ReasonLabels[Reason.FraudSuspicion]}
            onChange={(e) => fields.fraudSuspicion.onChange(e.target.checked)}
          />
          <Checkbox
            checked={fields.photoIssues.value}
            label={ReasonLabels[Reason.PhotoIssues]}
            onChange={(e) => fields.photoIssues.onChange(e.target.checked)}
          />
          <Textarea
            label={ReasonLabels[Reason.Other]}
            maxLength={200}
            value={fields.other.value}
            onChange={(e) => fields.other.onChange(e.target.value)}
            placeholder='Введите причину'
          />
          <Button disabled={!isFormDirty} type='submit' variant='light' color={color}>
            Отправить
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
