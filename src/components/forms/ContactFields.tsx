import { US_STATES } from "@/config/business";
import type { FieldErrors } from "@/lib/forms/schemas";
import { FormSection, SelectField, TextField } from "./fields";

/** "Your information" + "Address" groups, identical on both inquiry forms. */
export function ContactFields({ errors }: { errors: FieldErrors }) {
  return (
    <>
      <FormSection step={1} title="Your information">
        <TextField name="firstName" label="First name" required autoComplete="given-name" error={errors.firstName} />
        <TextField name="lastName" label="Last name" required autoComplete="family-name" error={errors.lastName} />
        <TextField name="phone" label="Phone number" required type="tel" inputMode="tel" autoComplete="tel" error={errors.phone} />
        <TextField name="email" label="Email address" required type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} error={errors.email} />
      </FormSection>

      <FormSection step={2} title="Your address">
        <TextField name="street" label="Street address" required autoComplete="address-line1" error={errors.street} className="sm:col-span-2" />
        <TextField name="city" label="City" required autoComplete="address-level2" error={errors.city} />
        <div className="grid grid-cols-[1.4fr_1fr] gap-4">
          <SelectField name="state" label="State" required autoComplete="address-level1" error={errors.state}>
            <option value="" disabled>
              Select
            </option>
            {US_STATES.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </SelectField>
          <TextField name="zip" label="ZIP code" required inputMode="numeric" autoComplete="postal-code" maxLength={10} error={errors.zip} />
        </div>
      </FormSection>
    </>
  );
}
