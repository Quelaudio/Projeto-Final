const Tweet = require('../sequelize').Tweet;
const multer = require('multer');
const path = require('path');

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// const upload = multer({ dest: './public/data/uploads/' , 
// filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//  } })

const upload = multer({ storage: storage });

// Controlador para criar um tweet
exports.createTweet = (req, res, next) => {
    upload.single('img')(req, res, err => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const { user_id, text } = req.body;
        const img_path = req.file ? req.file.path : null;

        Tweet.create({ user_id, text, img_path })
            .then(newTweet => {
                res.send("Inserted with ID: " + newTweet.tweet_id);
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
    });
};

// Controlador para obter todos os tweets
exports.getTweets = (req, res, next) => {
    Tweet.findAll()
        .then(tweets => {
            res.send(tweets);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

// Controlador para atualizar um tweet
exports.upTweets = (req, res, next) => {
    const { tweet_id, text, img_path } = req.body;

    Tweet.update(
        {
            text: text,
            img_path: img_path
            
        },
        {
            where: {
                tweet_id: tweet_id
            }
        }
    )
    .then(result => {
        if (result[0] === 0) {
            res.status(404).json({ message: "Tweet not found or no changes made" });
        } else {
            res.status(200).json({ message: "Tweet updated successfully" });
        }
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
};

exports.deleteTweet = (req, res) => {
    const { tweet_id } = req.params; 
    Tweet.findByPk( tweet_id) 
        .then(tweet => {
            if (tweet == null) {
                return res.status(404).json({ message: 'No Tweet found with that ID' });
            } else {
                return tweet.destroy().then(() => {
                    res.status(200).json({ message: 'Tweet successfully deleted' });
                });
            }
        })
        .catch(error => {
            console.error('Error deleting Tweet:', error);
            res.status(500).send('Error deleting Tweet');
        });
};