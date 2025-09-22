// import Note from "../models/Notes.js";
import Note from "../models/Notes.js"

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({createdAt: -1}); //newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params; 

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save()

    
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {

    try{
        const {title, content} = req.body

       const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content}, 
        {
        new: true,
       }
    );
       if (!updatedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(updatedNote)
    }catch (error) {
        console.error("Error in upadateNote controller", error);
        res.status(500).json({ message: "Internal server error"})
    }
};


export const deleteNote = async (req, res) => {
    try{
        const {title, content} = req.body
        const deletedNote = await Note.findByIdAndDelete(req.params.id,{title,content},
        {
            new: true,
        }
    );

    if (!deletedNote) return res.status(404).json ({message: "Note not found"})
        res.status(200).json({message:"note deleted successfully"})
    }catch (error) {
         console.error("Error in deleteNote controller", error);
        res.status(500).json({ message: "Internal server error"})
    }
};
