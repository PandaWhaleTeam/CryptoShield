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



  SBcontroller.delete_fav = async (req, res, next) => {
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
       
        // if the usert has no fav, make an empty arr
        const currentFavs = data.fav || [];
        console.log(currentFavs)
        deleteIndex = currentFavs.indexOf(newFav)
        if (deleteIndex > -1) {
        
            currentFavs.splice(deleteIndex, 1);
        }
   

        // Update the favorites
        const { data: updateData, error: updateError } = await supabase
            .from('user')
            .update({ fav: currentFavs})
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
        // WHERE username = '${username}' AND password = '${password}';
        // `
        //const result = await supabase(verifyUserQuery)
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('username', username)
            .eq('password', password);

        console.log('data', data)
        //if (error) throw error;
        res.locals.userId = data[0].user_id;
        res.locals.username = data[0].username;
        // console.log('hereeeeeee',res.locals.username )  
        if(data.length === 0) {
            return res.status(401).send('Invalid username or password');
        }
        
        return next()
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred inside of verifyUser middleware' });
    }
}

SBcontroller.verifyGoogleUser = async (req, res, next) =>{

    console.log('I am inside of verifyGoogleUser')
    console.log(req.body)

    const { email, full_name} = req.body;
    console.log(full_name)

    const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('email', email)

    if(data.length === 0) {

        console.log('google user currently does not exist, make it in user table' )

        try {        
            const { data_2, error } = await supabase
                .from('user')
                .insert([
                { username: full_name, email: email},
                ])
                .select()

            res.locals.userId = data_2[0].user_id;
            res.locals.username = data_2[0].username;
            return next()
        
        }
        catch{console.error('Error:', error);}
    }

    else {
        console.log('user already exists in the regular table')
        console.log('data', data)

        res.locals.userId = data[0].user_id;
        res.locals.username = data[0].username;
        return next()

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




