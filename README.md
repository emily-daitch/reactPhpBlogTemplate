***I have decided to remove the create-react-app dependency because the React team no longer recommends using it and because I wanted to learn more about some of the things that are set up for you like webpack and env-cmd. Also, I have switched from using ChakraUI to MUI for personal preference and a smaller bundle size. Additionally, I have moved away from Victory Charts to CanvasJS charts for the smaller bundle size and better default styling. For these reasons, and to separate the frontend and backend code, this project now lives at [this frontend repo](https://github.com/emily-daitch/reactPhpBlogTemplate2) and [this backend repo](https://github.com/emily-daitch/reactPhpBlogTemplateBackend) . Soon I will be updating the readme with info about setting up the project and hosting your own blog/portfolio using this as a template. Thank you***

Hello. This is a blog website template built with a React frontend and PHP backend with a SQL database.<br>
The original inspiration is from this [YouTube tuorial](https://www.youtube.com/watch?v=RQYpSfXUgn4) by Zarx Biz<br/><br/>
See my implementation: https://emilydaitch.click/<br/>

I have chosen to use Hostinger to host the site although there are many hosts that could work. For local development I use [XAMPP](https://www.apachefriends.org/) Apache and MySQL. It is possible to use the live-update "yarn start" for faster iteration, and to have that frontend connect to the database managed in XAMPP, which I will explain in more detail in the DEVELOPMENT.md file.<br/><br/>
I recommend using a staging subdomain to test your changes before letting them "go live", like I have done here: https://staging.emilydaitch.click/<br/>
I will explain this in the HOSTING.md document.<br/>
<br/>
This template consists of:<br/>
 - A home page with a paginated list of blog posts
 - A page for viewing the full contents of selected single blog posts
 - A resume page
 - A "Contact Me" page
 - A calendar page for displaying availability and to offer scheduling
 - Components are from the Chakra UI library
 - Light/Dark Mode toggling and centralized theme definitions with extendTheme from Chakra UI
 - For fun, an optional page that connects to the Strava exercise app API and displays workout data with CanvasJS charts
<br/>
Soon, I will be decoupling this from create-react-app because that tool has been deprecated and no longer receives support.
