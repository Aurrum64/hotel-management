import supabase from "../supabase";

const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Couldn't load cabins.");
  }

  return data;
};

export default getCabins;
