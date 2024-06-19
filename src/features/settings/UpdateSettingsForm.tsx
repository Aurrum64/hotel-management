import { FocusEvent } from "react";
import { useGetSettings } from "./api/useGetSettings";
import { useUpdateSetting } from "./api/useUpdateSettings";
import Form from "../../ui/generalized-form";
import { FormControlProps } from "../../ui/generalized-form/form";

function UpdateSettingsForm() {
  const { settings, settingsAreFetching } = useGetSettings();
  const { updateSettingMutation } = useUpdateSetting();

  const updateSettings = (
    key: string,
    { target: { value } }: FocusEvent<HTMLInputElement, Element>
  ) => {
    if (!value) return;
    updateSettingMutation({ [key]: Number(value) });
  };

  const formData: FormControlProps[] = [
    {
      label: "Minimum nights/booking",
      id: "min-nights",
      type: "number",
      onBlur: (e) => updateSettings("min_booking_period", e as any), // TODO remove any
      disabled: settingsAreFetching,
    },
    {
      label: "Maximum nights/booking",
      id: "max-nights",
      type: "number",
      onBlur: (e) => updateSettings("max_booking_period", e as any), // TODO remove any
      disabled: settingsAreFetching,
    },
    {
      label: "Maximum guests/booking",
      id: "max-guests",
      type: "number",
      onBlur: (e) => updateSettings("max_guests_per_booking", e as any), // TODO remove any
      disabled: settingsAreFetching,
    },
    {
      label: "Breakfast price",
      id: "breakfast-price",
      type: "number",
      onBlur: (e) => updateSettings("breakfast_price", e as any), // TODO remove any
      disabled: settingsAreFetching,
    },
  ];

  return (
    <Form
      controls={formData}
      defaultValues={{
        "min-nights": settings?.min_booking_period || 0,
        "max-nights": settings?.max_booking_period || 0,
        "max-guests": settings?.max_guests_per_booking || 0,
        "breakfast-price": settings?.breakfast_price || 0,
      }}
      withFooterButtons={false}
    />
  );
}

export default UpdateSettingsForm;
