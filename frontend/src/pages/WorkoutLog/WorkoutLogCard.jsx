// WorkoutLog/WorkoutLogCard.jsx

import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Edit3, Trash2, Save, Clock, Target, Hash } from "lucide-react";

export default function WorkoutLogCard({
  log,
  editingLog,
  setEditingLog,
  handleEditLog,
  handleUpdateLog,
  handleDeleteLog,
}) {
  const isEditing = editingLog?.id === log.id;
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!editingLog.exerciseName || /[^a-zA-Z\s]/.test(editingLog.exerciseName)) {
      newErrors.exerciseName = "Only letters and spaces allowed.";
    }
    if (!editingLog.sets || editingLog.sets < 1 || editingLog.sets > 10) {
      newErrors.sets = "Sets must be between 1 and 10.";
    }
    if (!editingLog.reps || editingLog.reps < 1 || editingLog.reps > 40) {
      newErrors.reps = "Reps must be between 1 and 40.";
    }
    if (!editingLog.duration || editingLog.duration < 1 || editingLog.duration > 300) {
      newErrors.duration = "Duration must be between 1 and 300 minutes.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      handleUpdateLog();
    }
  };

  if (isEditing) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Exercise Name</Label>
              <Input
                value={editingLog.exerciseName}
                onChange={(e) =>
                  setEditingLog({
                    ...editingLog,
                    exerciseName: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                  })
                }
                className={`border-purple-200 focus:border-purple-400 ${errors.exerciseName ? 'border-red-500' : ''}`}
              />
              {errors.exerciseName && <p className="text-red-600 text-xs mt-1">{errors.exerciseName}</p>}
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Sets</Label>
              <Input
                type="number"
                value={editingLog.sets}
                min={1}
                max={10}
                onChange={(e) =>
                  setEditingLog({
                    ...editingLog,
                    sets: Math.min(10, Math.max(1, parseInt(e.target.value) || 1)),
                  })
                }
                className={`border-purple-200 focus:border-purple-400 ${errors.sets ? 'border-red-500' : ''}`}
              />
              {errors.sets && <p className="text-red-600 text-xs mt-1">{errors.sets}</p>}
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Reps</Label>
              <Input
                type="number"
                value={editingLog.reps}
                min={1}
                max={40}
                onChange={(e) =>
                  setEditingLog({
                    ...editingLog,
                    reps: Math.min(40, Math.max(1, parseInt(e.target.value) || 1)),
                  })
                }
                className={`border-purple-200 focus:border-purple-400 ${errors.reps ? 'border-red-500' : ''}`}
              />
              {errors.reps && <p className="text-red-600 text-xs mt-1">{errors.reps}</p>}
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Duration</Label>
              <Input
                type="number"
                value={editingLog.duration}
                min={1}
                max={300}
                onChange={(e) =>
                  setEditingLog({
                    ...editingLog,
                    duration: Math.min(300, Math.max(1, parseInt(e.target.value) || 1)),
                  })
                }
                className={`border-purple-200 focus:border-purple-400 ${errors.duration ? 'border-red-500' : ''}`}
              />
              {errors.duration && <p className="text-red-600 text-xs mt-1">{errors.duration}</p>}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" onClick={() => setEditingLog(null)} size="sm">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // View Mode
  return (
    <>
      <Card className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{log.exerciseName}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {log.sets && (
                <div className="flex items-center">
                  <Hash className="h-4 w-4 mr-1 text-purple-500" />
                  <span>{log.sets} sets</span>
                </div>
              )}
              {log.reps && (
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1 text-pink-500" />
                  <span>{log.reps} reps</span>
                </div>
              )}
              {log.duration && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-cyan-500" />
                  <span>{log.duration}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditLog(log)}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowConfirm(true)}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete <strong>{log.exerciseName}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowConfirm(false)}
                variant="outline"
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteLog(log.id)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
