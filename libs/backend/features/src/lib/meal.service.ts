import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateMeal, IMeal, MealSort } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class MealService {
    TAG = 'MealService';

    private meals$ = new BehaviorSubject<IMeal[]>([
        {
            id: '0',
            title: 'Spaghetti con funghi',
            description: 'Vega version of the famous spaghetti recipe.',
            isVega: true,
            dateServed: new Date(),
            sort: MealSort.Dinner,
            cook: 'Koen van Steen'
        },
    ]);

    getAll(): IMeal[] {
        Logger.log('getAll', this.TAG);
        return this.meals$.value;
    }

    getOne(id: string): IMeal {
        Logger.log(`getOne(${id})`, this.TAG);
        const meal = this.meals$.value.find((td) => td.id === id);
        if (!meal) {
            throw new NotFoundException(`Meal could not be found!`);
        }
        return meal;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(meal: ICreateMeal): IMeal {
        Logger.log('create', this.TAG);
        const current = this.meals$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newMeal: IMeal = {
            ...meal,
            id: `meal-${Math.floor(Math.random() * 10000)}`,
            isVega: false,
            dateServed: new Date(),
            //cook: 'onbekend',
           // sort: MealSort.Breakfast,
        };
        // Add it to our list of todos
        this.meals$.next([...current, newMeal]);
        return newMeal;
    }
}
