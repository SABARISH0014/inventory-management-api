const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const s = new Schema({ name: String });

s.pre('save', function(next) {
    try {
        console.log('type of next is:', typeof next);
        if (typeof next !== 'function') {
           console.log('next is:', next);
        }
        next();
    } catch (e) {
        console.error('Error in pre-save:', e.message);
        throw e;
    }
});

const M = mongoose.model('TestHook', s);

async function run() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test_db', { useNewUrlParser: true, useUnifiedTopology: true});
    const doc = new M({name: 'test'});
    try {
        await doc.save();
        console.log('Saved successfully');
    } catch(e) {
        console.error('Catch error:', e.message);
    }
    process.exit(0);
}

run();
