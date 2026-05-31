'use client';

import * as React from 'react';
import {
    Controller,
    FormProvider,
    useFormContext,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

const Form = FormProvider;

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName };

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

function FormField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
}

type FormItemContextValue = { id: string };
const FormItemContext = React.createContext<FormItemContextValue | null>(null);

function useFormField() {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();

    if (!fieldContext) throw new Error('useFormField must be used inside <FormField>');
    if (!itemContext) throw new Error('useFormField must be used inside <FormItem>');

    const fieldState = getFieldState(fieldContext.name, formState);

    return {
        name: fieldContext.name,
        formItemId: `${itemContext.id}-item`,
        formMessageId: `${itemContext.id}-message`,
        formDescriptionId: `${itemContext.id}-description`,
        ...fieldState,
    };
}

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className = '', ...props }, ref) => {
        const id = React.useId();
        return (
            <FormItemContext.Provider value={{ id }}>
                <div ref={ref} className={`flex flex-col gap-1.5 ${className}`} {...props} />
            </FormItemContext.Provider>
        );
    }
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className = '', ...props }, ref) => {
        const { error, formItemId } = useFormField();
        return (
            <label
                ref={ref}
                htmlFor={formItemId}
                className={`text-sm font-semibold ${error ? 'text-red-600' : 'text-slate-700'} ${className}`}
                {...props}
            />
        );
    }
);
FormLabel.displayName = 'FormLabel';

interface FormControlProps {
    children: React.ReactElement<{
        id?: string;
        'aria-invalid'?: boolean;
        'aria-describedby'?: string;
    }>;
}

function FormControl({ children }: FormControlProps) {
    const { error, formItemId, formMessageId, formDescriptionId } = useFormField();
    const child = React.Children.only(children);
    return React.cloneElement(child, {
        id: formItemId,
        'aria-invalid': !!error,
        'aria-describedby': error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId,
    });
}

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={`text-xs text-slate-400 ${className}`}
            {...props}
        />
    );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error.message ?? '') : children;
    if (!body) return null;
    return (
        <p
            ref={ref}
            id={formMessageId}
            className={`text-xs text-red-600 flex items-center gap-1 ${className}`}
            {...props}
        >
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                />
            </svg>
            {body}
        </p>
    );
});
FormMessage.displayName = 'FormMessage';

export {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useFormField,
};
