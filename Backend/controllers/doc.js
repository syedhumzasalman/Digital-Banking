

export const docController = async (req, res) => {
    try {
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({
                message: "No files uploaded",
                data: null,
            });
        }


        const uploadedFiles = [];

        for (const file of files) {
            const uploaded = await cloudinaryUploader.upload(file.path);
            uploadedFiles.push(uploaded);

        }

        // delete uploads folder
        await fs.rm("./uploads", { recursive: true, force: true });

        return res.status(201).json({
            message: "Uploaded successfully",
            data: uploadedFiles,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            data: null,
        });
    }
}