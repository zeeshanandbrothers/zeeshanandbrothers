import mongoose, { Schema } from "mongoose";

if (mongoose.models.Project) {
    // Prevent Overwrite Error in Next.js hot reload
    delete mongoose.models.Project;
}

const ProjectSchema = new Schema(
    {
        title: { type: String, required: true },
        coverImage: { type: String, required: true },
        galleryImages: [{ type: String }],
        city: { type: String, required: true },
        projectType: { type: String, required: true },
        shortDescription: { type: String, required: true },
        fullDescription: { type: String, required: true },
        systemInfo: {
            inverter: { type: String },
            batteries: { type: String },
            panels: { type: String },
            systemType: { type: String },
        },
        date: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
