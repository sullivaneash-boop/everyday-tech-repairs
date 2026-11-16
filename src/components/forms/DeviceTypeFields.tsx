import { DEVICE_CATEGORIES } from "@/config/business";
import type { FieldErrors } from "@/lib/forms/schemas";
import { SelectField, TextField } from "./fields";

type Props = { errors: FieldErrors; deviceType: string; onDeviceType: (value: string) => void };

/** Device type picker; choosing "Other Electronics" reveals a short description field. */
export function DeviceTypeFields({ errors, deviceType, onDeviceType }: Props) {
  return (
    <>
      <SelectField
        name="deviceType"
        label="Device type"
        required
        error={errors.deviceType}
        value={deviceType}
        defaultValue={undefined}
        onChange={(e) => onDeviceType(e.target.value)}
        className={deviceType === "other" ? "" : "sm:col-span-2"}
      >
        <option value="" disabled>
          Select a device type
        </option>
        {DEVICE_CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </SelectField>
      {deviceType === "other" ? (
        <TextField
          name="deviceTypeOther"
          label="What kind of device is it?"
          required
          error={errors.deviceTypeOther}
          placeholder="e.g. Smart watch, TV, speaker"
        />
      ) : null}
    </>
  );
}
