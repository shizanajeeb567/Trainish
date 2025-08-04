// WorkoutLog/WorkoutLogCard.jsx

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

  if (isEditing) {
    return (
      <Card className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Exercise Name</Label>
              <Input
                value={editingLog.exerciseName}
                onChange={(e) => setEditingLog({ ...editingLog, exerciseName: e.target.value })}
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Sets</Label>
              <Input
                type="number"
                value={editingLog.sets}
                onChange={(e) => setEditingLog({ ...editingLog, sets: e.target.value })}
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Reps</Label>
              <Input
                type="number"
                value={editingLog.reps}
                onChange={(e) => setEditingLog({ ...editingLog, reps: e.target.value })}
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Duration</Label>
              <Input
                value={editingLog.duration}
                onChange={(e) => setEditingLog({ ...editingLog, duration: e.target.value })}
                className="border-purple-200 focus:border-purple-400"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleUpdateLog}
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
            onClick={() => handleDeleteLog(log.id)}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
