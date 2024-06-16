import supabase, { supabaseUrl } from "../supabase";

// TODO remove any
const createEditCabin = async (cabin: any, id?: number) => {
  const imageIsReset = typeof cabin.image !== 'string';
  console.log('imageIsReset', imageIsReset);

  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');

  if (id) {
    query = query.update({...cabin, image: imageIsReset ? imagePath : cabin.image}).eq('id', id);
  }

  if (!id) {
    query = query.insert([{...cabin, image: imagePath}]);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw new Error("The cabin cannot be created.");
  }

  if (imageIsReset) {
    const { error: storageError } = await supabase
      .storage
      .from('cabin-images')
      .upload(imageName, cabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id)
      throw new Error("BLABLABLA");
    }
  }
};

export default createEditCabin;
