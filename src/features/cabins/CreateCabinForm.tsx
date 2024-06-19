import { useMutation, useQueryClient } from "@tanstack/react-query";
import createEditCabin from "../../services/createEditCabin";
import toast from "react-hot-toast";
import { FormControlProps } from "../../ui/generalized-form/form";
import Form from "../../ui/generalized-form";

type CreateCabinFormProps = {
  cabinToEdit?: any;
  onClose?: () => void;
};

const CreateEditCabinForm = ({
  cabinToEdit,
  onClose,
}: CreateCabinFormProps) => {
  console.log("cabinToEdit", cabinToEdit);
  const formData: FormControlProps[] = [
    {
      label: "Cabin name",
      id: "name",
      type: "text",
      required: true,
    },
    {
      label: "Maximum capacity",
      id: "max_capacity",
      type: "number",
      required: true,
    },
    {
      label: "Regular price",
      id: "regular_price",
      type: "number",
      required: true,
    },
    {
      label: "Discount",
      id: "discount",
      type: "number",
      required: true,
      validations: {
        validate: () => "AKA Validation result",
      },
    },
    {
      label: "Description",
      id: "description",
      type: "description",
      required: true,
    },
    {
      label: "Cabin Photo",
      id: "image",
      type: "image",
      required: cabinToEdit ? false : true,
    },
  ];

  const queryClient = useQueryClient();

  const { mutate: createCabinMutation } = useMutation({
    // TODO
    mutationFn: (data: any) => createEditCabin(data),
    onSuccess: () => {
      toast.success("Succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      onClose?.();
    },
    onError: () => toast.error("The cabin cannot be created."),
  });

  const { mutate: editCabinMutation } = useMutation({
    // TODO
    mutationFn: (data: any) => createEditCabin(data, cabinToEdit.id),
    onSuccess: () => {
      toast.success("Succesfully edited.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: () => toast.error("The cabin cannot be edited."),
  });

  // TODO Remove any
  const onFormSubmit = (data: any) => {
    debugger;
    cabinToEdit
      ? editCabinMutation(
          {
            ...data,
            image: !data?.image?.[0] ? cabinToEdit.image : data.image[0],
          },
          { onSuccess: onClose }
        )
      : createCabinMutation(
          { ...data, image: data.image[0] },
          { onSuccess: onClose }
        );
  };

  return (
    <Form
      controls={formData}
      type="modal"
      onFormSubmit={onFormSubmit}
      onClose={onClose}
      defaultValues={cabinToEdit}
    />
  );
};

export default CreateEditCabinForm;
