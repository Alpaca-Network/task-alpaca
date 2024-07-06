import clsx from 'clsx'
import { useId } from 'react'

const formClasses =
  'block w-full appearance-none rounded-lg border border-gray-400 bg-gray-800 py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-200 placeholder:text-gray-400 focus:border-[#fb7e3e] focus:outline-none focus:ring-[#fb7e3e] sm:text-sm'

function Label({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-lg font-semibold text-gray-200"
    >
      {children}
    </label>
  )
}

export function TextField({
  label,
  type = 'text',
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> & { label?: string }) {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  )
}

export function SelectField({
  label,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<'select'>, 'id'> & { label?: string }) {
  let id = useId()

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  )
}

export function NumberField({
  label,
  className,
  type = 'number',
  ...props
}: Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> & { label?: string }) {
  let id = useId();

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={clsx(formClasses, className)} />
    </div>
  );
}