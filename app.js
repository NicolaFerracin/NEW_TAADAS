var site = require('apostrophe-site')();
var bodyParser = require('body-parser');


require('dotenv').config();

var discourse_sso = require('discourse-sso');
var sso = new discourse_sso(process.env.DISCOURCE_SSO_SECRET);

function editorFullControlls() {
    return  [ 'slideshow', 'banner', 'imageBoxwithText', 'arrayOfBoxes', 'iconAndText', 'accordeon', 'bigIcon', 'gallery', 'files', 'html',"HorizontalRule", 'style', 'bold', 'italic', 'createLink', 'unlink', 'buttons', 'video','insertTable', 'embed', 'pullquote',  'insertUnorderedList','JustifyLeft','JustifyCenter','JustifyRight', 'justify','TextColor','Font','FontSize'];
}

site.init({
  

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'TAADAS',
  hostName: 'https://taadas.org',
  title: 'TAADAS',
  sessionSecret: process.env.SESSION_SECRET,
  adminPassword: process.env.ADMIN_PASS,
  address: process.env.IP,
  port: process.env.PORT,
  redirectAfterLogin: function(user) {
  if (user) {
      return '/join-taadas/membership-info/member-s-area';
   } else {
      return '/';
   }
  },
  
  
  
  
  // Force a2 to prefix all of its URLs. It still
  // listens on its own port, but you can configure
  // your reverse proxy to send it traffic only
  // for URLs with this prefix. With this option
  // "/" becomes a 404, which is supposed to happen!

  // prefix: '/test',

  // If true, new tags can only be added by admins accessing
  // the tag editor modal via the admin bar. Sometimes useful
  // if your folksonomy has gotten completely out of hand
  lockTags: false,

  // Give users a chance to log in if they attempt to visit a page
  // which requires login
  //this option disable 'redirectAfterLogin' processing
  //secondChanceLogin: true,

  locals: require('./lib/locals.js'),

  


  // you can define lockups for areas here

  // Here we define what page templates we have and what they will be called in the Page Types menu.

  // For html templates, the 'name' property refers to the filename in ./views/pages, e.g. 'default'
  // refers to '/views/pages/default.html'.

  // The name property can also refer to a module, in the case of 'blog', 'map', 'events', etc.



  pages: {
    types: [{
      name: 'default',
      label: 'Default'
    }, {
      name: 'home',
      label: 'Home Page'
    }, {
      name: 'current-members',
      label: '2 columns'
    }, {
      name: 'resources',
      label: 'Resources'
    }, {
      name: 'contact',
      label: 'About Us'
    }, {
      name: 'materials',
      label: 'Training Materials'
    }, {
      name: 'publications',
      label: 'Publications'
    },{
      name: 'dvds',
      label: 'DVD Orders'
    },{
      name: 'filesuploded',
      label: 'Files Archive'
    }, {
      name: 'dvd-order-form',
      label: 'DVD Order Form'
    }, {
      name: 'publication-order-form',
      label: 'Publication Order Form'
    },{
      name: 'events',
      label: 'Events'
    }, {
      name: 'members-area',
      label: 'Members Area'
    }],
    tabOptions: {
      depth: 4
    },
    descendantOptions: {
      depth: 4
    }

  },

  // These are the modules we want to bring into the project.
  modules: {
    
    // Styles required by the new editor, must go FIRST
    
    'apostrophe-editor-2': {
      plugins: [
        { name: 'panelbutton', path: '/editor/plugins/panelbutton/' },
        { name: 'colorbutton', path: '/editor/plugins/colorbutton/' },
        { name: 'font', path: '/editor/plugins/font/' }
      ]
    },
    'apostrophe-ui-2': {},
    'apostrophe-browserify': {
      files: ['./public/js/modules/_site.js']
    },
    'apostrophe-blog-2': {
      perPage: 5,
      pieces: {
        addFields: [{
          name: '_author',
          type: 'joinByOne',
          withType: 'person',
          idField: 'authorId',
          label: 'Author'
        }]
      }
    },
    'apostrophe-people': {
      addFields: [{
        name: '_blogPosts',
        type: 'joinByOneReverse',
        withType: 'blogPost',
        idField: 'authorId',
        label: 'Author',
        withJoins: ['_editor']
      }, {
        name: 'thumbnail',
        type: 'singleton',
        widgetType: 'slideshow',
        label: 'Picture',
        options: {
          aspectRatio: [100, 100]
        }
      }]
    },
    'apostrophe-groups': {},
    'apostrophe-search': {},

    'dvds': {
      extend: 'apostrophe-snippets',
      name: 'dvds',
      label: 'DVDs',
      instance: 'dvd',
      instanceLabel: 'Dvd',
      addFields: [{
        name: 'title',
        type: 'string',
        label: 'Title',
      }, {
        name: 'body',
        type: 'string',
        label: 'Description'
      }, {
        name: 'information',
        type: 'string',
        label: 'Information',
      }, {
        name: 'identifiers',
        type: 'array',
        label: 'Identifiers',
        schema: [{
          name: 'identifier',
          type: 'integer',
          label: 'Identifier'

        }]
      }]
    },

    'publications': {
      extend: 'apostrophe-snippets',
      name: 'publications',
      label: 'Publications',
      instance: 'publication',
      instanceLabel: 'Publication',
      addFields: [{
        name: 'title',
        type: 'string',
        label: 'Title'
      }, {
        name: 'description',
        type: 'string',
        label: 'Description'
      }, {
        name: 'identifier',
        type: 'integer',
        label: 'Publication number',
      }, {
        name: 'physical',
        type: 'boolean',
        label: 'physical'
      }]
    },
    'filesuploded': {
      removeFields: [ 'thumbnail'],
      extend: 'apostrophe-snippets',
      name: 'filesuploded',
      label: 'Files',
      instance: 'fileuploded',
      instanceLabel: 'File',
      addFields: [{
        name: 'title',
        type: 'string',
        label: 'Title'
      }, {
        name: 'description',
        type: 'string',
        label: 'Description'
      }]
    },
    'apostrophe-schema-widgets': {
      widgets: [{
        name: 'arrayOfBoxes',
        label: 'Boxes Image&Text',
        type: 'array',
        icon:'fa4 fa4-fw fa4-square-o',
        schema: [{
          name: 'boxes',
          type: 'array',
          schema: [{
            name: 'image',
            label: 'Image',
            type: 'singleton',
            widgetType: 'slideshow',
            options: {
              limit: 1
            },
            required: true
          }, {
            name: 'url',
            type: 'url',
            label: 'Image link',
            required: false
          }, {
            name: 'title',
            type: 'string',
            label: 'Title',
            required: true
          }, {
            name: 'body',
            type: 'string',
            label: 'Body',
            required: true
          }]
        }]
      },
      {
        name: 'iconAndText',
        label: 'Iconic header',
        instructions: 'Look for icons names at http://fontawesome.io/icons/',
        
        icon:'fa4 fa4-fw fa4-heart',
        schema: [{
          name: 'icon',
          label:'Fontawesome icon name',
          type: 'string'},
          {
          name: 'text',
          label:'Header text',
          type: 'string'},
          {
          name: 'color',
          label:'Background Color (CSS)',
          type: 'string'},
          {
          name: 'colorf',
          label:'Text Color (CSS)',
          type: 'string'},
          {
          name: 'bigsize',
          label:'Big size',
          type: 'boolean'},
          {
          name: 'center',
          label:'Centralized',
          type: 'boolean'}
          ]
      },
      {
        name: 'bigIcon',
        label: 'Big Icon Header',
        instructions: 'Look for icons names at http://fontawesome.io/icons/',
        icon:'fa4 fa4-fw fa4-heart fa4-2x',
        schema: [
          { 
            name: 'icon',
            label:'Fontawesome icon name',
            type: 'string'}
          ]
      },
      {
        name: 'accordeon',
        label: 'Accordeon',
        icon:'fa4 fa4-fw fa4-bars',
        type: 'array',
        schema: [
          {
            name: 'boxes',
            type: 'array',
            schema:[
              {
                name: 'title',
                label:'Title',
                type: 'string'},
              {
                name: 'accbody',
                label:'Item\'s Body',
                type: 'area',
                options:{
                  controls:editorFullControlls(),
                  styles: [
                    { value: 'p', label: 'Text' },
                    { value: 'h1', label: 'Heading 1' },
                    { value: 'h3', label: 'Heading 3' }
                  ]
                }
                
      
              }
              ]
          }
          ]
      },
      
      {
        name: 'banner',
        label: 'Banner',
        icon:'fa4 fa4-fw fa4-image',
        schema: [
          {name: 'image',
            label: 'Image',
            type: 'singleton',
            widgetType: 'slideshow',
            options: {
              limit: 1
            }
          },
          { 
            name: 'url',
            label:'Hyperlink',
            type: 'string'},
          { 
            name: 'newtab',
            label:'Open in new tab',
            type: 'boolean'}
          ]
        
      }

      
      ]
    }
  },

  uploadfs: {
    backend: 's3',
    secret: process.env.AMAZON_SECRET,
    key: process.env.AMAZON_KEY,
    bucket: 'taadas',
    region: 'us-west-1'
  },

  // These are assets we want to push to the browser.
  // The scripts array contains the names of JS files in /public/js,
  // while stylesheets contains the names of LESS files in /public/css
  assets: {
    stylesheets: ['site', 'custom-styles'],
    scripts: ['_site-compiled', 'bootstrap', 'contact_me', 'jqBootstrapValidation', 'global']
  },


  setRoutes: function(callback) {
    var nodemailer = require('nodemailer');
    var xoauth2 = require('xoauth2');

    site.app.post('/order', function(req, res) {

      var formData = req.body;

      // turn data from order form into html

     
      var table='';
      
      if (formData['titles']) {
        
        var tableRows = '';
        var titlesArray = formData['titles'].split('_'),
          quantitiesArray = formData['quantities'].split('_'),
          identifiersArray = formData['identifiers'].split('_');
          
        delete(formData.titles);
        delete(formData.quantities);
        delete(formData.identifiers);
  
        titlesArray.forEach(function(title, index) {
          tableRows += '<tr><td>' + title + '</td><td>' + quantitiesArray[index] + '</td><td>' + identifiersArray[index] + '</td></tr>'
        });
        
        var tableHead = '<thead><tr><th>Title</th><th>Quantity</th><th>Identifier</th></tr></thead>';

        table = '<table>' + tableHead + '<tbody>' + tableRows + '</tbody></table>';

        
      }

     
      var formInfo = '<div>';
      
      for(var k in formData){
        var val = formData[k];
        
        if(typeof(val)==='boolean'){
          val = (val==='on')?'Yes':'No';
          
        }
        
        formInfo += '<p>'+k+': '+val+'</p>'
      }
      
      /*
      //old template
        '<p>' + formData['Company Name'] + '</p>' +
        '<p>' + formData['First Name'] + ' ' + formData['Last Name'] + '</p>' +
        '<p>' + formData['Address'] + '</p>' +
        '<p>' + formData['City'] + ', ' + formData['State'] + ' ' + formData['Zip'] + '</p>' +
        '<p>' + 'Phone: ' + formData['Phone'] + '</p>' +
        '<p>' + formData['Email'] + '</p>' +
        '<p>' + 'Allow Promotional Materials: ' + (formData['Allow Promotional'] === 'on').toString() + '</p>' +
        '<p>' + 'Is Commercial Location: ' + (formData['Is Commercial'] === 'on').toString() + '</p>' +
        */
        
      formInfo+='</div>';


      var html = '<div>' + table + '</hr>' + formInfo + '</div>';
      var subject,user;

        if (formData.to) {
          subject = formData.subj;
          var to = formData.to.replace(/[,;<>]/g,'');
          user = to+'@taadas.org';
        } else {
          subject = 'No subject form received';
          user = process.env.DEFAULT_FORMS_EMAIL;
        }
      

      var mailOpts, smtpTrans;

      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          xoauth2: xoauth2.createXOAuth2Generator({
            user: 'taadasorders@gmail.com',
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN
          })
        }
      });
      //Mail options
      mailOpts = {
        from: 'taadasorders@gmail.com',
        to: user,
        subject: subject,
        html: html
      };

      transporter.sendMail(mailOpts, function(error, response) {
        //Email not sent
        if (error) {
          res.end('error');
          console.log(error);
        }
        //Email sent
        else {
          res.end('ok');
        }
      });
    });
    
    
     site.app.get('/backup', getDumpsList);
     site.app.get('/backup/apply/:fn', applyDump);
     site.app.get('/backup/download/:fn', downloadDump);
     site.app.post('/backup/upload', uploadDump);
     site.app.get('/backup/dump-now', createDumpNow);
     
     site.app.get('/discourse/sso', function(req, res) {

        if (req.user) {
          //pass login info
          
          
          var payload = req.query.sso;
          var sig = req.query.sig;
          if(sso.validate(payload, sig)) {
            var nonce = sso.getNonce(payload);
            
            var userparams = {
                // Required, will throw exception otherwise 
                "nonce": nonce,
                "external_id": req.user._id,
                "email": (req.user.username!=='admin')?req.user.email:process.env.DISCOURCE_ADMIN_EMAIL,
                // Optional 
                "username": (req.user.username!=='admin')?req.user.username:process.env.DISCOURCE_ADMIN_LOGIN,
                "name": req.user.title
            };
            var q = sso.buildLoginString(userparams);
            
            
            res.redirect('http://158.69.220.239/session/sso_login?' + q);
          } else {
            res.send('error');
          }
          
          
          
          
        } else {
          res.redirect('/login');
        }
       
        
        
      });
    
    
    return callback(null);
  },

  


  afterInit: function(callback) {
    // We're going to do a special console message now that the
    // server has started. Are we in development or production?
    var locals = require('./data/local');

    if (locals.development || !locals.minify) {
      console.error('Apostrophe Sandbox is running in development.');
    }
    else {
      console.error('Apostrophe Sandbox is running in production.');
    }

    //prevent cross protocol (https/http) images
    site.uploadfs.getUrl = function() {
      return 'https://taadas.s3.amazonaws.com';
    }

    site.apos.addLocal('editorFullControlls', editorFullControlls);
    
   site.apos.addLocal('normalizeNavItem', function(item) {
        if (item.title.indexOf('#')>=0) {
          var a = item.title.split('#');
          item.url = a[1];
          item.title = a[0];
          item.target="_blank";
        }
    });
    
    return callback(null);
  },
  
    sanitizeHtml: {
    allowedTags: false,
    allowedAttributes: false
  }
  



});


//==================================================================
//=== backuping ====================================================
//==================================================================

var keepDumpsForDays= 10;
var backupsDir =  __dirname+'/dump';


var fs = require('fs');

if (!fs.existsSync(backupsDir)){
    fs.mkdirSync(backupsDir);
}
function enumDumps(fullPath) {
  var files = fs.readdirSync(backupsDir);
  if (fullPath) {
    return files.map(function(f){
      return backupsDir+'/'+f;
    });
  } else {
    return files;
    
  }
}

//backup database each night


var CronJob = require('cron').CronJob;
var spawnSync = require('child_process').spawnSync;

function execute(command) {
  command=command.split(' ');
  var ret = spawnSync(command.shift(), command);
  

  
  if (ret.stderr) {
    return ret.stderr.toString();
  }
  // body...
}

//function puts(error, stdout, stderr) { console.log(stdout);console.log(stderr); }


function dumpDatabase(dumpFN) {
   try {
     dumpFN = __dirname+'/dump/'+dumpFN;
    if (process.env.PRODICTION) {
      execute("mongodump --db taadas_db --gzip --archive="+dumpFN);
    } else {
      execute("mongodump --host ds011321.mlab.com --db heroku_0nqgs5jf --port 11321 -u taadas_admin -p ab39sf25481Q --gzip --archive="+dumpFN);
    }

    var expirationTime = new Date().getTime() - 86400000*keepDumpsForDays;
    var files = enumDumps(true);
    files.some(function(fn){
    
      var stats = fs.statSync(fn);
      if (stats.ctime.getTime() < expirationTime) {
        
        fs.unlinkSync(fn);
      }
      
    })
  } catch(e) {
    return(e);
    
  }
}

new CronJob('0 1 1 * * *', function() { //nightly at 01:01
//new CronJob('30 * * * * *', function() { //each minute

  console.log('started backup process');
  var d = new Date();
  var dumpFN = 'dump-'+d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+'.taadas_backup';
  console.log(dumpDatabase(dumpFN));
 
  
}, null, true, 'America/Los_Angeles');


//ui
var nunjucks = require('nunjucks');

function checkBackupPermissions(req, res){
  if (!req.user || !req.user.permissions.admin) {
    res.end('Access denied.');
    
  } else {
    
    return true;
  }

}

var messageToShow='';

function getDumpsList(req, res) {
  if (checkBackupPermissions(req,res)) {
    var template = fs.readFileSync(__dirname+'/views/backups-list.html', 'utf8');
    res.end(nunjucks.renderString(template, {files:enumDumps(),message:messageToShow}));
    messageToShow = '';
    
  }
       
}

function uploadDump(req, res) {
  if (checkBackupPermissions(req,res)) {
    
    if (req.files.dumpFile.name.indexOf('/')>=0 || req.files.dumpFile.name.indexOf('\\')>=0) {
      res.end('wrong file name');
      return;
    }
    
    var source = fs.createReadStream(req.files.dumpFile.path);
    var dest = fs.createWriteStream(backupsDir+'/'+req.files.dumpFile.name);
    
    source.pipe(dest);
    source.on('end', function() {
      messageToShow = 'Uploading success.';
      res.redirect('/backup');
    });
    source.on('error', function(err) {
      messageToShow = err;
      res.redirect('/backup');
    });

    
  }
  
}

function downloadDump(req, res) {
  if (checkBackupPermissions(req,res)) {
    
    
    res.writeHead(200, {"Content-Type": "application/octet-stream","Content-Disposition": 'inline; filename="'+req.params.fn+'"'
    });
    fs.createReadStream(backupsDir+'/'+req.params.fn)
      .pipe(res);

  }
}


function applyDump(req, res) {
  if (checkBackupPermissions(req,res)) {
    
  var dumpFN = backupsDir+'/'+req.params.fn;
  try{
    var called;
    if (process.env.PRODICTION) {
      messageToShow = execute("mongorestore --db taadas_db --gzip --drop --archive="+dumpFN);
    } else {
      messageToShow = execute("mongorestore --host ds011321.mlab.com --db heroku_0nqgs5jf --port 11321 -u taadas_admin -p ab39sf25481Q --gzip --drop --archive="+dumpFN);
    }
    messageToShow = messageToShow.split('\n').join('<br>');
    res.redirect('/backup');
  }catch(e){
    console.log(e);
    messageToShow = e;
    res.redirect('/backup');
  }
  
    
  }
};

function createDumpNow(req, res) {
  if (checkBackupPermissions(req,res)) {
    var d = new Date();
    var dumpFN = 'manual_dump_'+d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+'_'+d.getHours()+'.'+d.getMinutes()+'.'+d.getSeconds()+'.taadas_backup';
    messageToShow = dumpDatabase(dumpFN) || ('dumped as '+dumpFN);
    res.redirect('/backup');

  }
};
    