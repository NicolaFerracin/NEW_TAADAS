var site = require('apostrophe-site')();
var bodyParser = require('body-parser');


require('dotenv').config();

var discourse_sso = require('discourse-sso');
var sso = new discourse_sso(process.env.DISCOURCE_SSO_SECRET);

site.init({
  

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'NEW_TAADAS',
  hostName: 'NEW_TAADAS',
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
                type: 'area'}
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
      if (req.headers.referer.match('publication')) {
        var subject = 'Publication Orders';
        var user = process.env.PUBLICATIONS_EMAIL;
      }else if (req.headers.referer.match('dvd')) {
        var subject = 'DVD Orders';
        var user = process.env.DVD_EMAIL;
      } else {
        if (formData.to) {
          subject = formData.subj;
          user = formData.to+'@taadas.org';
        } else {
          subject = 'Join as member request';
          user = process.env.JOIN_EMAIL;
        }
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
          res.json(error);
          console.log(error);
        }
        //Email sent
        else {
          res.json(response);
        }
      });
    });
    
    
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

    site.apos.addLocal('editorFullControlls', function() {
      return  [ 'slideshow', 'banner', 'imageBoxwithText', 'arrayOfBoxes', 'iconAndText', 'accordeon', 'bigIcon', 'gallery', 'files', 'html',"HorizontalRule", 'style', 'bold', 'italic', 'createLink', 'unlink', 'buttons', 'video','insertTable', 'embed', 'pullquote',  'insertUnorderedList','JustifyLeft','JustifyCenter','JustifyRight', 'justify','TextColor','Font','FontSize'];
    });
    
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
