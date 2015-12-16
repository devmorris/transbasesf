# transbasesf
Repo for www.transbasesf.org
<html lang="en-US">
<body>
<article id="post-58"  class="art-post art-article  post-58 page type-page status-publish hentry">
<p>The first step to download PostgreSQL/PostGIS. I prefer the package created by EnterpriseDB because it includes Apache (version) with PHP enabled and a stack builder for enabling PostGIS/ODBC in one install. You can download EnterpriseDB's PostgreSQL installer <a href="http://www.enterprisedb.com/downloads/postgres-postgresql-downloads">here</a>. If you would like to use PostGIS with ESRI ArcGIS I recommend installing version 9.1 - check out this <a href="http://resources.arcgis.com/en/help/system-requirements/10.1/index.html#/PostgreSQL_Database_Requirements/015100000075000000/">link</a> for more information.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step27.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step27-1024x546.jpg" alt="step27" width="1024" height="546" /></a></p>
<p>Run the installer to setup PostgreSQL and click Next.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step28.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step28.jpg" alt="step28" width="558" height="428" /></a></p>
<p>Select a location to install PostgreSQL. I'm going to go with the default installation location for this tutorial.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step29.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step29.jpg" alt="step29" width="558" height="428" /></a></p>
<p>Select a location where your data will be stored. Again, I'm going to go with the default.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step30.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step30.jpg" alt="step30" width="558" height="428" /></a></p>
<p>Create a password for your superuser account. By default this user will be given the name postgres. Make sure you write your password down.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step31.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step31.jpg" alt="step31" width="558" height="428" /></a></p>
<p>Enter the port number you would like PostgreSQL to listen on. I'm going to use the default of 5432 for this tutorial.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step32.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step32.jpg" alt="step32" width="558" height="428" /></a></p>
<p>Select a language.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step33.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step33.jpg" alt="step33" width="558" height="428" /></a></p>
<p>Finally, PostgreSQL is ready to be installed. Click Next to continue.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step34.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step34.jpg" alt="step34" width="558" height="428" /></a></p>
<p>At the end of the installation you will be prompted to Launch Stack Builder. Make sure this option is checked and click Finish.</p>
<p><img class="aligncenter size-full wp-image-101" src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step36.jpg" alt="step36" width="558" height="428" /></p>
<p>Select your installation of PostgreSQL and click Next.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step37.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step37.jpg" alt="step37" width="615" height="412" /></a></p>
<p>Check the following applications for installation: psqlODBC (if you want to use ODBC with your database); PostGIS 2.0 under spatial extensions; and Apache/PHP v2.4.12 under Web Development. A screen will appear confirming your selected packages. Use the default directory and click Next.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step38.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step38.jpg" alt="step38" width="615" height="412" /></a></p>
<p>Each package you selected will then install. Click next until finished. For this tutorial I am using the default installation location for all of these components. Please use port 80 for the Apache/PHP server.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step44.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step44.jpg" alt="step44" width="558" height="428" /></a></p>
<p>When you get to the PostGIS installer make sure "create spatial database" is checked.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step52.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step52.jpg" alt="step52" width="503" height="386" /></a></p>
<p>Again, select an installation location. It should default to the location of your PostgreSQL folder.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step53.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step53.jpg" alt="step53" width="503" height="386" /></a></p>
<p>Enter your postgres superuser information and click Next.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step54.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step54.jpg" alt="step54" width="503" height="386" /></a></p>
<p>When asked to register an environmental variable for GDAL_DATA click Yes. GDAL is the library PostGIS uses to do Raster transformations. You can learn more about this cool project <a href="http://www.gdal.org/">here.</a></p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step57.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step57.jpg" alt="step57" width="414" height="152" /></a></p>
<p>After the installation of all the packages is complete verify that Apache has been installed correctly by opening your browser and navigating to <a href="http://localhost/">http://localhost/</a>.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step57a.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step57a-1024x546.jpg" alt="step57a" width="1024" height="546" /></a></p>
<p>Next click on the Start Menu an open pgAdmin. pgAdmin is a create GUI for accessing and querying your PostgreSQL databases.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step58.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step58.jpg" alt="step58" width="750" height="550" /></a></p>
<p>Double click on your PostgreSQL instance. You will be prompted for the password you setup during installation. You should see two databases: postgis_template and postgres.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step59.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step59-1024x546.jpg" alt="step59" width="1024" height="546" /></a></p>
<p>Let's create a new database for all the data in TransBASE by restoring the pg_dump found on GitHub. Right click on your instance of PostgreSQL and select New Database. Give it a name. In this tutorial I'll be using transbase_demo. Set the owner of this new database to be your postgres superuser.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step61.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step61.jpg" alt="step61" width="458" height="472" /></a></p>
<p>Next click on the Definition tab at the top of the window. Use the postgis_template as the template for this new database. The postgis_template has the PostGIS extension enabled and includes all the internal tables PostGIS will need to create geospatial data. Use UTF8 for encoding. Click OK to create a new empty database.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step62.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step62.jpg" alt="step62" width="458" height="472" /></a></p>
<p>Right click on transbase_demo and click Restore. In the window that appears select Custom or tar from the dropdown box and navigate to the pg_dump of TransBASE you downloaded off GitHub then click Restore.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step631.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step631.jpg" alt="step63" width="435" height="355" /></a></p>
<p>You may receive a message that the role "opendata" does not exist. A read-only role is current used on TransBASE with the name opendata. You can create this role at a later time if needed. This error will not impact the tutorial.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step64.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step64.jpg" alt="step64" width="740" height="355" /></a></p>
<p>Double check that the pg_dump has been restored properly by checking out the tables under the public schema.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step65.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step65-1024x546.jpg" alt="step65" width="1024" height="546" /></a></p>
<p>Create a spatial query to ensure PostGIS is running properly with the new data. Click SQL button in the top tool bar and enter the following SQL statement:</p>
<p>SELECT count(vw_geo_intrsctn_switrs_all_types_cyc_col_prty_vctm.unique_id), geo_bndry_neighborhoods.neighborho FROM vw_geo_intrsctn_switrs_all_types_cyc_col_prty_vctm, geo_bndry_neighborhoods WHERE ST_Intersects (vw_geo_intrsctn_switrs_all_types_cyc_col_prty_vctm.geom, geo_bndry_neighborhoods.geom) GROUP BY geo_bndry_neighborhoods.neighborho ORDER BY count(vw_geo_intrsctn_switrs_all_types_cyc_col_prty_vctm.unique_id) DESC</p>
<p>This query will show a count of cyclist collisions by neighborhood in San Francisco.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step66.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step66-1024x577.jpg" alt="step66" width="1024" height="577" /></a></p>
<p>You will need to setup your firewall to allow incoming and outgoing connections on ports 80, 8080, and 5432. Instructions for doing this on Windows can be found <a href="https://technet.microsoft.com/en-us/library/dd421709(v=ws.10).aspx)"here</a>. Next you will need to set PostgreSQL to allow connections from any IP address. You can quickly access pg_hba.conf using pgAdmin. Click on Tools, Server Configuration, then click pg_hba.conf.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step72a.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step72a.jpg" alt="step72a" width="513" height="755" /></a></p>
<p>Double click the top host.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step721.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step721.jpg" alt="step72" width="650" height="300" /></a></p>
<p>Change the IP Address to 0.0.0.0/0. This will allow any IP Address to connect to this instance of PostgreSQL. You could also limit this IP address to the range of your internal network if desired.</p>
<p><img class="aligncenter size-full wp-image-131" src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step73.jpg" alt="step73" width="251" height="264" /></p>
<p>Next you will want to setup Apache Tomcat. Tomcat is a Java servlet that we will use to run Geoserver and MapFish Print. The first step is to install a Java Runtime Environment (JRE). In this tutorial we'll run Java SE Runtime Environment 8 64bit.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step74.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step74-1024x546.jpg" alt="step74" width="1024" height="546" /></a></p>
<p>Double click the installation file after it has finished download. We're going to all Java to install in the default location. Click Install.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step75.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step75.jpg" alt="step75" width="506" height="379" /></a></p>
<p>After Java has finished we will need to create an environmental variable to our Java environment. In the Control Panel navigate to Systems and Security then Systems - click Advance system settings on the left hand site.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step76.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step76.jpg" alt="step76" width="852" height="600" /></a></p>
<p>In the System Properties window click the Advance tab.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step77.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step77.jpg" alt="step77" width="410" height="461" /></a></p>
<p>Click the Environmental Variables button toward the bottom of the window and create a new variable with the name JAVA_HOME and variable value that points to your ...\Java\jre folder.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step78.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step78.jpg" alt="step78" width="347" height="140" /></a></p>
<p>Next we will need to download Tomcat. For this tutorial I'm going to use Tomcat 7. Download the 32/64-bit Windows Service Installer.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step79.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step79-1024x546.jpg" alt="step79" width="1024" height="546" /></a></p>
<p>After the installer downloads run it and click next when the Tomcat Setup screen appears.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step80.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step80.jpg" alt="step80" width="503" height="386" /></a></p>
<p>Select the Normal installation and click next.</p>
<p>Select the Normal installation and click next.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step81.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step81.jpg" alt="step81" width="503" height="386" /></a></p>
<p>Use the default settings. In this tutorial Tomcat will be operating on port 8080. Click next.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step82.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step82.jpg" alt="step82" width="503" height="386" /></a></p>
<p>If you set up your JAVA_HOME environmental variable correctly the Tomcat installer should recognize the location of your JRE's installation directory. Click Next.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step83.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step83.jpg" alt="step83" width="503" height="386" /></a></p>
<p>Pick a directory to install Tomcat or use the default location.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step84.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step84.jpg" alt="step84" width="503" height="386" /></a></p>
<p>When the installation wizard is complete check Run Apache Tomcat and click Finish. Tomcat will now start and run as a service.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step85.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step85.jpg" alt="step85" width="503" height="386" /></a></p>
<p>Open your browser and navigate to <a href="http://localhost:8080/">http://localhost:8080/</a>. If Tomcat has been installed properly you should see the following page:<a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step87.jpg"><br />
</a></p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step87a.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step87a-1024x546.jpg" alt="step87a" width="1024" height="546" /></a></p>
<p>Next you will need to download a Geoserver web archive (WAR) to run on the Tomcat servlet. You can obtain the WAR file <a href="http://docs.geoserver.org/stable/en/user/installation/war.html" target="_blank">here</a>. Geoserver will allow data stored in PostGIS to be served out in a variety of OGC compliant forms and consumed by a client application.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step881.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step881-1024x546.jpg" alt="step88" width="1024" height="546" /></a></p>
<p>Download the latest Geoserver WAR (at the time of this writing 2.7.1), unzip the file, and save the .war file into the following directory: C:\Program Files\Apache Software Foundation\Tomcat 7.0\webapps.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step90b.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step90b.jpg" alt="step90b" width="852" height="600" /></a></p>
<p>Next you will need to add a role and user to access Tomcat's manager interface. Navigate to the following file: C:\Program Files\Apache Software Foundation\Tomcat 7.0\conf\tomcat-users.xml and open the file in a text editor.<a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step91a.jpg"><img class="aligncenter size-full wp-image-154" src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step91a.jpg" alt="step91a" width="852" height="600" /></a></p>
<p>Add the following role and user in between the &lt;-tomcat-user&gt; tags:</p>
<p>&lt;role rolename = &#8220;manager-gui&#8221;/&gt;</p>
<p>&lt;user username=&#8221;manager&#8221; password=&#8221;[your_pass_word_here]&#8221; roles=&#8221;manager-gui&#8221;/&gt;</p>
<a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step91.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step91-1024x591.jpg" alt="step91" width="1024" height="591" /></a></p>
<p>Open the Tomcat manager (bottom right side of Windows bar at the bottom of the screen) then stop and start Tomcat.</p>
<p>Navigate to the Tomcat web application manager interface located here: http://localhost:8080/manager/</p>
<p>Log in using the user name and password you created previously.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step92.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step92.jpg" alt="step92" width="416" height="396" /></a></p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step93.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step93.jpg" alt="step93" width="429" height="274" /></a></p>
<p>In the manager interface you should see Geoserver as an application. Double check that the service is running.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step941.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step941-1024x546.jpg" alt="step94" width="1024" height="546" /></a></p>
<p>Next navigate to the following web address: http://localhost:8080/geoserver. You should see the default Geoserver manager page.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step95.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step95-1024x546.jpg" alt="step95" width="1024" height="546" /></a></p>
<p>The default user name for logging into Geoserver is "admin" and the password "geoserver." Make sure to change these to something more secure using the web manager. After you login you should see a screen similar to the one below.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step96.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step96-1024x546.jpg" alt="step96" width="1024" height="546" /></a></p>
<p>Some of the layer styles used in TransBASE require the Web Protocol Service (WPS) extension. This is not natively installed with Geoserver and will need to be added manually. Please go to the following <a href="http://sourceforge.net/projects/geoserver/files/GeoServer/2.7.1/extensions/">website </a>and download the appropriate zip file for your version of Geoserver.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step97.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step97-1024x546.jpg" alt="step97" width="1024" height="546" /></a></p>
<p>Unzip or copy/paste the files you just downloaded to the following folder: C:\Program Files\Apache Software Foundation\Tomcat 7.0\webapps\geoserver\WEB-INF\lib.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step98.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step98.jpg" alt="step98" width="852" height="600" /></a></p>
<p>Restart Tomcat and log back into the Geoserver manager. On the left side of the page under Services an image for WPS should now be shown. Click WPS and verify that it is enabled.</p>
<p>Next you will need to overwrite Geoserver's workspace with TransBASE's styles and layers. Copy the following folder from your Github download and paste it in here: C:\Program Files\Apache Software Foundation\Tomcat 7.0\webapps\geoserver\data. If asked if you would like to merge and overwrite the existing workspaces folder in Geoserver click yes.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step101.jpg"><img class="aligncenter size-large wp-image-170" src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step101-1024x576.jpg" alt="step101" width="1024" height="576" /></a></p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step102.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step102.jpg" alt="step102" width="456" height="437" /></a></p>
<p>Double click on the workspaces folder and delete all the other folders except transbase_public.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step103.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step103-1024x576.jpg" alt="step103" width="1024" height="576" /></a></p>
<p>Double click on transbase_public and open datastore.xml in a text editor. You will need to change the database stores properties to match your PostGIS instance.</p>
<p>Navigate to the section of XML under &lt;connectionParamters&gt;. Change the following parameters to match your PostGIS instance:</p>
<p>&lt;entry key="passwd"&gt;[your_password]&lt;/entry&gt;</p>
<p>&lt;entry key ="database"&gt;[name_of_your_transbase_database]&lt;/entry&gt;</p>
<p>&lt;entry key="user"&gt;[name_of_your_user_if_not_postgres]&lt;/entry&gt;</p>
<p>Save this file and restart Tomcat.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step1051.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step1051.jpg" alt="step105" width="955" height="659" /></a></p>
<p>Log back into the Geoserver manager and click on the Layers link on the left side of the page. You should now see several layers/views being pulled from your PostGIS instance.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step106.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step106-1024x546.jpg" alt="step106" width="1024" height="546" /></a></p>
<p>Next you will need to configure Apache and Tomcat to work together on the same port. Some of the pages that make up TransBASE utilize PHP which Apache can easily process. An alternative would be setting up Tomcat to use PHP but I've never had any luck getting it to work properly. Navigate to the following &#8212; C:\Program Files (x86)\PostgreSQL\EnterpriseDB-ApachePHP\apache\conf &#8212; and open httpd.conf in a text editor.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step108.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step108.jpg" alt="step108" width="852" height="600" /></a></p>
<p>Search for the following modules and uncomment (remove the # sign) in front of them:</p>
<p>modules/mod_proxy_http.so</p>
<p>modules/mod_proxy.so</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step109.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step109.jpg" alt="step109" width="557" height="347" /></a></p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step110.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step110.jpg" alt="step110" width="955" height="659" /></a></p>
<p>Near the top of httpd.conf you will need to set up a virtual host to route traffic for the Tomcat serevlet to Port 8080 while allowing PHP based pages to be processed by Apache Server. Copy the following text under "Listen 80":</p>
<p>NameVirtualHost *:80</p>
<p>&lt;VirtualHost *:80&gt;<br />
ServerName [your_ip_address]/transbase<br/>
ProxyRequests Off<br />
ProxyPreserveHost On</p>
<p>&lt;Proxy *&gt;<br />
Order deny,allow<br />
Allow from all<br />
&lt;/Proxy&gt;<br />
ProxyPass /metadata/metadata.php !<br />
ProxyPass /metadata/connection.php !<br />
ProxyPass /headerimages/rotate.php !<br />
ProxyPass /bugreport/bugpage.php !<br />
ProxyPass /newdatasets/newdatasets.php !<br />
ProxyPass /youtube/youtube.php !<br />
ProxyPass /metatable/metatable.php !<br />
ProxyPass /connection/connection.php !<br />
ProxyPass /faq/faq.php !<br />
ProxyPass /logo/transbase_logo.png !<br />
ProxyPass / http://[your_ip_address]:8080/<br />
ProxyPassReverse / http://[your_ip_address]:8080/<br />
&lt;/VirtualHost&gt;</p>
<p>Make sure to replace the bracketed text with your IP address.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step111.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step111.jpg" alt="step111" width="955" height="659" /></a></p>
<p>The next step is to set up a Connector port on Tomcat to redirect outbound 8080 traffic back to Apache on port 80. Copy the following text into C:\Program Files\Apache Software Foundation\Tomcat 7.0\conf\server.xml under &lt;Connector&#8230;&gt;:</p>
<p>&lt;Connector port=&#8221;8080&#8243;<br />
maxThreads=&#8221;150&#8243; minSpareThreads=&#8221;25&#8243; maxSpareThreads=&#8221;75&#8243;<br />
enableLookups=&#8221;false&#8221; acceptCount=&#8221;100&#8243; connectionTimeout=&#8221;20000&#8243;/&gt;</p>
<p>Save the file when you&#8217;re finished.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step112.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step112.jpg" alt="step112" width="955" height="659" /></a></p>
<p>Copy and paste the transbase folder into your webapps folder on Tomcat &#8212; C:\Program Files\Apache Software Foundation\Tomcat 7.0\webapps.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step113.jpg"><img  src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step113-1024x576.jpg" alt="step113" width="1024" height="576" /></a></p>
<p>Open C:\Program Files\Apache Software Foundation\Tomcat 7.0\webapps\transbase\scripts\heron-config\DefaultOptionsWorld.js and open it with a text editor. Use find and replace all to replace "transbasesf.org" with your project's IP address.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step114.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step114.jpg" alt="step114" width="557" height="347" /></a></p>
<p>Next copy over the ROOT folder into the webapps folder on Tomcat. If asked, say yes to overwriting any of the existing files in the ROOT folder.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step115.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step115-1024x576.jpg" alt="step115" width="1024" height="576" /></a></p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step116.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step116.jpg" alt="step116" width="456" height="437" /></a></p>
<p>Open up C:\Program Files\Apache Software Foundation\Tomcat 7.0\webapps\ROOT\index.html in a text editor and change "transbasesf.org" to your domain or IP address.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step117.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step117.jpg" alt="step117" width="955" height="659" /></a></p>
<p>Next copy all folders in the transbase apache folder over to here: C:\Program Files (x86)\PostgreSQL\EnterpriseDB-ApachePHP\apache\www.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step119b.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step119b-1024x576.jpg" alt="step119b" width="1024" height="576" /></a></p>
<p>Copy the print-servlet-2.0-SNAPSHOT folder into C:\Program Files\Apache Software Foundation\Tomcat 7.0\webapps. In order to enable MapFish Print you will need to open C:\Program Files\Apache Software Foundation\Tomcat 7.0\webapps\print-servlet-2.0-SNAPSHOT\config.yaml and change the host to your IP address.<a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step119c.jpg"><img class="aligncenter size-full wp-image-188" src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step119c.jpg" alt="step119c" width="955" height="659" /></a></p>
<p>MapFish also requires an installation of Python 2.7 to operate. You can find Python <a href="https://www.python.org/downloads/">here</a>.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/stepp1.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/stepp1-1024x546.jpg" alt="stepp1" width="1024" height="546" /></a></p>
<p>Run the installer and click Finish when it has completed.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/stepp21.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/stepp21.jpg" alt="stepp2" width="499" height="425" /></a></p>
<p>Open up the Services window and restart both EnterpriseDB ApachePHP and Tomcat.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step120a.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step120a.jpg" alt="step120a" width="405" height="464" /></a></p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step120.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step120.jpg" alt="step120" width="820" height="600" /></a></p>
<p>Navigate to your IP address in a web broswer and it should redirect to the TransBASE web application. Turn a layer on to make sure everything is working properly.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step121.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step121-1024x576.jpg" alt="step121" width="1024" height="576" /></a></p>
<p>Click the printer icon and verify that MapFish Print is working correctly.</p>
<p><a href="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step123.jpg"><img src="http://devanmorris.com/wordpress/wp-content/uploads/2015/06/step123-1024x576.jpg" alt="step123" width="1024" height="576" /></a></p>
<p>That's it. The next steps would be to replace data in PostGIS with your own and modify the layers in TransBASE as needed to match your needs.</p>
</div>                                            
</article>
</body>
	</html>
