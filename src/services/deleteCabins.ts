import supabase from "../supabase";

const deleteCabins = async (id: number) => {
    const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error);
    throw new Error("Couldn't delete cabin.");
  }
};

export default deleteCabins;
