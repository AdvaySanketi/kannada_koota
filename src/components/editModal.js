import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/dialog";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import { Textarea } from "@/components/textarea";

const EditModal = ({ isOpen, onClose, itemType, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  React.useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const renderFormFields = () => {
    switch (itemType) {
      case "announcement":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="atitle">Title</Label>
              <Input
                id="atitle"
                name="atitle"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter announcement title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adesc">Description</Label>
              <Input
                id="adesc"
                name="adesc"
                value={formData.desc}
                onChange={handleChange}
                placeholder="Enter announcement description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aetitle">English Title</Label>
              <Input
                id="aetitle"
                name="aetitle"
                value={formData.en_title}
                onChange={handleChange}
                placeholder="Enter English title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aedesc">English Description</Label>
              <Input
                id="aedesc"
                name="aedesc"
                value={formData.en_desc}
                onChange={handleChange}
                placeholder="Enter English description"
              />
            </div>
          </>
        );
      case "member":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter member name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                placeholder="Enter member domain"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="isHead">Is Head</Label>
              <div className="flex items-center gap-4 pb-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isHeadYes"
                    checked={formData.isHead == true}
                    onClick={() => handleChange()}
                  />
                  <Label htmlFor="isHeadYes">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="isHeadNo"
                    checked={formData.isHead == false}
                    onClick={() => handleChange()}
                  />
                  <Label htmlFor="isHeadNo">No</Label>
                </div>
              </div>
            </div>
          </>
        );
      case "event":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="etitle">Title</Label>
              <Input
                id="etitle"
                name="etitle"
                value={formData.etitle}
                onChange={handleChange}
                placeholder="Enter event title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edesc">Description</Label>
              <Input
                id="edesc"
                name="edesc"
                value={formData.edesc}
                onChange={handleChange}
                placeholder="Enter event description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eetitle">English Title</Label>
              <Input
                id="eetitle"
                name="eetitle"
                value={formData.eetitle}
                onChange={handleChange}
                placeholder="Enter English title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eedesc">English Description</Label>
              <Input
                id="eedesc"
                name="eedesc"
                value={formData.eedesc}
                onChange={handleChange}
                placeholder="Enter English description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edate">Date</Label>
              <Input
                id="edate"
                name="edate"
                type="date"
                value={formData.edate}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case "article":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="artitle">Title</Label>
              <Input
                id="artitle"
                name="artitle"
                value={formData.artitle}
                onChange={handleChange}
                placeholder="Enter article title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ardesc">Description</Label>
              <Input
                id="ardesc"
                name="ardesc"
                value={formData.ardesc}
                onChange={handleChange}
                placeholder="Enter article description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aretitle">English Title</Label>
              <Input
                id="aretitle"
                name="aretitle"
                value={formData.aretitle}
                onChange={handleChange}
                placeholder="Enter English title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aredesc">English Description</Label>
              <Input
                id="aredesc"
                name="aredesc"
                value={formData.aredesc}
                onChange={handleChange}
                placeholder="Enter English description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="arauthor">Author</Label>
              <Input
                id="arauthor"
                name="arauthor"
                value={formData.arauthor}
                onChange={handleChange}
                placeholder="Enter article author"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="argenre">Genre</Label>
              <Input
                id="argenre"
                name="argenre"
                value={formData.argenre}
                onChange={handleChange}
                placeholder="Enter article genre"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ardate">Date</Label>
              <Input
                id="ardate"
                name="ardate"
                type="date"
                value={formData.ardate}
                onChange={handleChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg bg-white rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle>
            Edit {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
          </DialogTitle>
          <DialogDescription>
            Please edit the details that are to be updated.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          {renderFormFields()}
          <DialogFooter className="flex items-center mt-10">
            <div className="w-1/2">
              <Button type="submit" className="w-full bg-black text-white">
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
