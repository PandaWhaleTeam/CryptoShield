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
SBcontroller.verifyUser = async (req, res, next) => {
    try {
        console.log('I am inside of verifyUser')
        console.log(req.body)
        // const username = req.body.usernameInput;
        // const password = req.body.passwordInput;
        const { usernameInput: username, passwordInput: password } = req.body;
        // const verifyUserQuery = `
        // SELECT * FROM user
        // WHERE username = $1 AND password = $2
        // `
        //const result = await supabase(verifyUserQuery)
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('username', username)
            .eq('password', password);
        console.log(data)  
        //if (error) throw error;
        if(data.length === 0) {
            return res.status(401).send('Invalid username or passwprd');
        }
        return next()
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred inside of verifyUser middleware' });
    }
}
  //const { username, password } = req.body;

  // TODO: Authentication logic
  // TODO: Check credentials in database --> make queries here!

//   if (username === 'testuser' && password === 'password') {
//       res.status(200).json({ message: 'Login successful!' });
//   } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//   }

// })


  module.exports = SBcontroller;




