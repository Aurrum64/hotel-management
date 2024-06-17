import { FocusEvent } from "react";
import Form from "../../ui/Form";
import Input from "../../ui/input";
import { FormRow, Label } from "../cabins/CreateCabinForm";
import { useGetSettings } from "./useGetSettings";
import { useUpdateSetting } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settings } = useGetSettings();
  const { updateSettingMutation } = useUpdateSetting();

  const updateSettings = (
    key: string,
    { target: { value } }: FocusEvent<HTMLInputElement, Element>
  ) => {
    if (!value) return;
    updateSettingMutation({ [key]: Number(value) });
  };

  return (
    <Form>
      <FormRow>
        <Label htmlFor="name">Minimum nights/booking</Label>
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings?.min_booking_period || 0}
          onBlur={(e) => updateSettings("min_booking_period", e)}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="name">Maximum nights/booking</Label>
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings?.max_booking_period || 0}
          onBlur={(e) => updateSettings("max_booking_period", e)}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="name">Maximum guests/booking</Label>
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings?.max_guests_per_booking || 0}
          onBlur={(e) => updateSettings("max_guests_per_booking", e)}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="name">Breakfast price</Label>
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakfast_price || 0}
          onBlur={(e) => updateSettings("breakfast_price", e)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
