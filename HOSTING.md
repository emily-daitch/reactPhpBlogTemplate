# Hosting with Hostinger
I will be explaining how to use Hostinger to host your own site using this template.</br>
You will need to change the package.json homepage to your domain "https://your-domain.com"<br><br>
# Setup
You will need to obtain a Hostinger account and choose/register a domain for your site. I suggest considering the different top level domains available to you (.com vs .org vs .info, etc.)<br>
I recommend setting up a subdomain for staging.your-domain.your-TLD so that you can test deployments without breaking your main "live" site.<br>

# Database
You will need to create and manage your database like you did for local development with XAMPP.<br>
Hostinger provides the "hpanel" to do this, where you will see something very similar to phpMyAdmin from local development.<br>

You will need to provide your database credentials to the live site using something like Redis or from a hidden (inaccessible) file on your server.
<br><br>Work in progress.
