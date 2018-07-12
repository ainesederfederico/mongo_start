const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost')
    .then(() => console.log('Conected to mongo'))
    .catch((err) => console.log('Could not conect to mongo ', err));

const courseSchema = new mongoose.Schema({

    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});


const Course = mongoose.model('Course', courseSchema);



async function createCourse() {

    const course = new Course({
        name: 'History',
        author: 'FAF',
        tags:['History'],
        isPublished:true
    });

    const result = await course.save();


    console.log(result);
    
}

async function getCourses() {

    const pageNumber = 2;

    const pageSize = 2;
    // const courses = await Course.find();
    
    // const courses = await Course
    //     .find({author:'FAF'});

    // const courses = await Course
    //     .find({author:'FAF'})
    //     .limit(1);

    // const courses = await Course
    //     .find({author:'FAF'})
    //     .sort({name:-1});

    const courses = await Course
        .find({author:'FAF'})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

    console.log(courses);
    
}

//createCourse();

getCourses();


