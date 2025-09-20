import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, Calculator, Trash2 } from 'lucide-react-native';

export default function ParticipationCalculator() {
  const insets = useSafeAreaInsets();
  const [activityName, setActivityName] = useState('');
  const [mark, setMark] = useState('');
  const [weight, setWeight] = useState('');
  const [activities, setActivities] = useState([]);

  const addActivity = () => {
    if (!activityName.trim()) {
      Alert.alert('Error', 'Please enter an activity name');
      return;
    }
    
    const markNum = parseFloat(mark);
    const weightNum = parseFloat(weight);
    
    if (isNaN(markNum) || markNum < 0 || markNum > 100) {
      Alert.alert('Error', 'Please enter a valid mark between 0 and 100');
      return;
    }
    
    if (isNaN(weightNum) || weightNum <= 0 || weightNum > 100) {
      Alert.alert('Error', 'Please enter a valid weight between 0 and 100');
      return;
    }

    const newActivity = {
      id: Date.now(),
      name: activityName.trim(),
      mark: markNum,
      weight: weightNum
    };

    setActivities([...activities, newActivity]);
    setActivityName('');
    setMark('');
    setWeight('');
  };

  const calculateFinalMark = () => {
    if (activities.length === 0) return 0;
    
    const totalWeightedMarks = activities.reduce((sum, activity) => {
      return sum + (activity.mark * activity.weight / 100);
    }, 0);
    
    const totalWeight = activities.reduce((sum, activity) => sum + activity.weight, 0);
    
    if (totalWeight === 0) return 0;
    
    return (totalWeightedMarks / totalWeight * 100).toFixed(1);
  };

  const clearAll = () => {
    Alert.alert(
      'Clear All Activities',
      'Are you sure you want to remove all activities?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => setActivities([]) }
      ]
    );
  };

  const totalWeight = activities.reduce((sum, activity) => sum + activity.weight, 0);

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={{ 
        backgroundColor: '#4f46e5', 
        paddingTop: insets.top + 16,
        paddingBottom: 16,
        paddingHorizontal: 20
      }}>
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: 'white',
          textAlign: 'center'
        }}>
          Participation Calculator
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        {/* Input Section */}
        <View style={{ 
          backgroundColor: 'white', 
          borderRadius: 12, 
          padding: 20, 
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1f2937' }}>
            Add New Activity
          </Text>
          
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#374151' }}>
              Activity Name
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
                backgroundColor: '#f9fafb'
              }}
              placeholder="e.g., Quiz 1, Assignment 2"
              value={activityName}
              onChangeText={setActivityName}
            />
          </View>

          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#374151' }}>
                Mark (%)
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: '#f9fafb'
                }}
                placeholder="85"
                value={mark}
                onChangeText={setMark}
                keyboardType="numeric"
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#374151' }}>
                Weight (%)
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  backgroundColor: '#f9fafb'
                }}
                placeholder="10"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#4f46e5',
              borderRadius: 8,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
            onPress={addActivity}
          >
            <Plus size={20} color="white" />
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
              Add Activity
            </Text>
          </TouchableOpacity>
        </View>

        {/* Activities List */}
        {activities.length > 0 && (
          <View style={{ 
            backgroundColor: 'white', 
            borderRadius: 12, 
            padding: 20, 
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#1f2937' }}>
              Activities ({activities.length})
            </Text>
            
            {activities.map((activity, index) => (
              <View key={activity.id} style={{ 
                paddingVertical: 12,
                borderBottomWidth: index < activities.length - 1 ? 1 : 0,
                borderBottomColor: '#e5e7eb'
              }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#1f2937', marginBottom: 4 }}>
                  {activity.name}
                </Text>
                <Text style={{ fontSize: 14, color: '#6b7280' }}>
                  {activity.mark}% (Weight: {activity.weight}%)
                </Text>
              </View>
            ))}
            
            <View style={{ 
              marginTop: 16, 
              paddingTop: 16, 
              borderTopWidth: 1, 
              borderTopColor: '#e5e7eb' 
            }}>
              <Text style={{ fontSize: 14, color: '#6b7280' }}>
                Total Weight: {totalWeight}%
              </Text>
              {totalWeight !== 100 && (
                <Text style={{ fontSize: 12, color: '#f59e0b', marginTop: 4 }}>
                  Note: Total weight should equal 100% for accurate calculation
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Final Mark Calculation */}
        {activities.length > 0 && (
          <View style={{ 
            backgroundColor: '#ecfdf5', 
            borderRadius: 12, 
            padding: 20, 
            marginBottom: 20,
            borderWidth: 1,
            borderColor: '#10b981'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Calculator size={20} color="#10b981" />
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#065f46' }}>
                Final Participation Mark
              </Text>
            </View>
            
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#065f46', textAlign: 'center' }}>
              {calculateFinalMark()}%
            </Text>
          </View>
        )}

        {/* Clear All Button */}
        {activities.length > 0 && (
          <TouchableOpacity
            style={{
              backgroundColor: '#ef4444',
              borderRadius: 8,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 20
            }}
            onPress={clearAll}
          >
            <Trash2 size={20} color="white" />
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
              Clear All
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}