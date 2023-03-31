Hello. This is a blog website template built with PHP and React. I will explain how to use XAMPP to develop changes locally.

I'm developing this as part of an effort to build my portfolio and to strengthen my skills with react / learn php.
Maybe students could learn from this as a starting point to experiment, or other developers could use it to build a blog/portfolio.

## Setting up for local development
There are many ways to serve php based sites locally for testing, but I use and will explain XAMPP here.
You will first want to fork and clone this repository as usual, but first, you'll want to download XAMPP, as we will want to clone
the repo into a subdirectory of the installation.

You can get XAMPP (Cross-platform, Apache, MySQL, PHP and Perl) <a href="https://www.apachefriends.org/">here</a>.

Once you have XAMPP, go ahead and clone this repo to <your-installation-path>/XAMPP/htdocs/

Once inside the new folder, run npm i to install your node modules.

Now, open XAMPP and click Start for Apache and MySQL.

Head back to the repo folder and run npm run start which will serve the app locally. 
A browser window should open automatically if it succeeds, but if not, navigate to localhost:3000

At this point, you should see that the site successfully loads, but there are no blog posts to show, visit, or search for.
We need to populate your local database.

Go to XAMPP and click on Admin next to MySQL. This will open phpMyAdmin where you can manage your database tables. 
Go ahead and add a database named react_php and add to it a table named testPosts.

Now, we are ready to define the table columns. Define columns for id, user_id, title, content, and image as seen below:
![image](https://user-images.githubusercontent.com/95369494/229135146-d6fae03e-a404-4e6c-9b32-811d3118d122.png)
You will need to ensure A.I is selected for the id column which will be our primary key.
The default number of columns is four so you will need to use the "Go" button at the top next to add columns to get the 5 we want.

Now we are ready to use <a href="https://jsonplaceholder.typicode.com">jsonplaceholder</a> from typicode to fill our table with "fake" data.

Before we get started below with hosting through npm run start like you may be used to doing with React development (where we would visit localhost:3000)
We can instead use the hosting location from XAMPP to our advantage.

Visit localhost/<the-name-of-your-root-folder-under-htdocs>
If you simply cloned, this will be localhost/emilydaitchclick

The page that renders is from index.php and you will see "Hello World" if the database connection was successful.
Comment out the getPosts call to save posts to your database.

You are now ready to serve the frontend!

Use npm run start and a new tab should automatically open in your browser, but if not navigate to localhost:3000
You should now see the home page with the posts you have saved. Have fun!

<br>
-Work In Progress-
<br>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
