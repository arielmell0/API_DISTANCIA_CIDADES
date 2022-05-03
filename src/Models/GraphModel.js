import mongoose from 'mongoose';

const GraphModel = mongoose.model('Graph', {
    data: [{ source: String, target: String, distance: Number }]
});

export default GraphModel;