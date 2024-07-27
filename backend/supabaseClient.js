const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const supabaseUrl = 'https://ptdcusrimsowtumozeln.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SBcontroller = {};

// this is test function to check if the data is connected
SBcontroller.get_fav = async (req, res, next) => {
    const userId = req.body.userId;  

    try {
        console.log(supabase)

        const { data, error }  = await supabase
            .from('user')
            .select('fav')
            .eq('user_id', userId)
        
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Data fetched successfully:', data);
        res.json(data);
      }
    } catch (error) {
      console.error('could not fetch data, not connected:', error);
    }
  
  }


  
  SBcontroller.add_fav = async (req, res, next) => {
      console.log(req.body.userId)
      const userId = req.body.userId;  
      const newFav = req.body.coinId;  
  
      try {
          // Fetch current favorites
          const { data, error } = await supabase
              .from('user')
              .select('fav')
              .eq('user_id', userId)
              .single();
  
          if (error) {
              console.error('Error fetching data:', error);
              return res.status(500).json({ error: 'Error fetching data' });
          }
          console.log(data)
          // if the usert has no fav, make an empty arr
          const currentFavs = data.fav || [];
          const updatedFavs = [...currentFavs, newFav];
  
          // Update the favorites
          const { data: updateData, error: updateError } = await supabase
              .from('user')
              .update({ fav: updatedFavs })
              .eq('user_id', userId);
  
          if (updateError) {
              console.error('Error updating data:', updateError);
              return res.status(500).json({ error: 'Error updating data' });
          }
  
          console.log('Favorites updated successfully:', updateData);
          res.json(updateData);
  
      } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'An error occurred' });
      }
  };

  module.exports = SBcontroller;



