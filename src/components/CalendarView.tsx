
import React from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useTradeStore } from '@/store/tradeStore';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CalendarDayCell } from './CalendarDayCell';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TradeForm } from './TradeForm';

export const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const { setSelectedDate, selectedDate } = useTradeStore();
  const [isAddTradeOpen, setIsAddTradeOpen] = React.useState(false);
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="w-full bg-card rounded-xl shadow-md border-2">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevMonth}
            aria-label="Previous month"
            className="rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-xl font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextMonth}
            aria-label="Next month"
            className="rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={goToToday}
            className="ml-2 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            Today
          </Button>
        </div>
        
        <Button
          size="lg"
          className="bg-primary shadow-lg hover:shadow-xl transition-all rounded-xl flex gap-2 items-center px-6 py-5 text-base"
          onClick={() => setIsAddTradeOpen(true)}
        >
          <Plus className="w-5 h-5" />
          <span>Add Trade</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-px border-b">
        {weekdays.map(day => (
          <div key={day} className="p-2 text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2 p-2">
        {monthDays.map(day => (
          <CalendarDayCell 
            key={day.toString()} 
            date={day} 
            isCurrentMonth={isSameMonth(day, currentMonth)}
            isSelected={isSameDay(day, selectedDate)}
            onSelectDate={() => setSelectedDate(day)}
          />
        ))}
      </div>
      
      <Dialog open={isAddTradeOpen} onOpenChange={setIsAddTradeOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-xl shadow-xl border-2">
          <DialogHeader>
            <DialogTitle>Add New Trade</DialogTitle>
            <DialogDescription>
              Enter the details of your trade below.
            </DialogDescription>
          </DialogHeader>
          <TradeForm onSuccess={() => setIsAddTradeOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
