**NOTE**: Please use the "live" branch. It has changes that make the site responsive for mobile. They will be integrated into the main branch soon.

Hello. This is a blog website template built with PHP and React. I will explain how to use XAMPP to develop changes locally.

# Setting up for local development

## Installing XAMPP
There are many ways to serve php based sites locally for testing, but I use and will explain XAMPP here.
Before forking and cloning this repo, you'll want to download XAMPP, as we will want to clone
the repo into a subdirectory of the installation.

You can get XAMPP (Cross-platform, Apache, MySQL, PHP and Perl) <a href="https://www.apachefriends.org/">here</a>.

## Setting up the repo
Once you have XAMPP, go ahead and clone this repo to <your-installation-path>/XAMPP/htdocs/<repo> (You will need to install git for your device if you do not have it already.)

Once inside the new folder, run npm i to install your node modules. (You will need to install npm for your device, if you do not have it already.)

## "Serving" the React frontend locally
Now, open XAMPP and click Start for Apache and MySQL.

Head back to the repo folder and run npm run start which will serve the app locally. 
A browser window should open automatically if it succeeds, but if not, navigate to localhost:3000

At this point, you should see that the site successfully loads, but there are no blog posts to show, visit, or search for.
We need to populate your local database.

## Populating your database
Go to XAMPP and click on Admin next to MySQL. This will open phpMyAdmin in your browser where you can manage your database tables. 
Go ahead and add a database named react_php and add to it a table named testPosts.

Now, we are ready to define the table columns. Define columns for id, user_id, title, content, and image as seen below:
![image](https://user-images.githubusercontent.com/95369494/229135146-d6fae03e-a404-4e6c-9b32-811d3118d122.png)
You will need to ensure A.I. (Auto increment) is selected for the id column which will be our primary key.
The default number of columns is four so you will need to use the "Go" button at the top next to add columns to get the 5 we want.

Now we are ready to use <a href="https://jsonplaceholder.typicode.com">jsonplaceholder</a> from typicode to fill our table with "fake" data.

Begin by visiting localhost/reactPhpBlogTemplate. You should see "Hello World" instead of the blog site.
This is because with the way things are set up, XAMPP's apache server is serving index.php instead of index.html like the webpack dev server we started with "npm run start" is.

Go to index.php and uncomment getPosts() to populate your database by refreshing localhost/reactPhpBlogTemplate. You may need to update api/services/DB.php with your db credentials for this to work if you did not go with the defaults.

## Serving the site locally with data populated
Now, you can refresh localhost:3000.
You should now see the home page with the posts you have saved. You can change the posts contents through phpMyAdmin. Have fun!

<br>
-Work In Progress-
<br>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
