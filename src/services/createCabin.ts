import supabase, { supabaseUrl } from "../supabase";

// TODO remove any
const createCabin = async (cabin: any) => {
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from('cabins')
    .insert([{...cabin, image: imagePath}])
    .select();

  if (error) {
    console.log(error);
    throw new Error("The cabin cannot be created.");
  }

  const { error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, cabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id)
    throw new Error("BLABLABLA");
  }
};

export default createCabin;
