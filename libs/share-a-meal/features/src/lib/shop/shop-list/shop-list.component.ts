import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Subscription } from 'rxjs';
import { IShop } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'avans-nx-workshop-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css'],
})
// export class ShopListComponent {}
export class ShopListComponent implements OnInit, OnDestroy {
  shops: IShop[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private shopService: ShopService, 
    private authService: AuthService,
     private router: Router) {}

  ngOnInit(): void {

    if (!this.authService.currentUser$.getValue()) {
      // Gebruiker is niet ingelogd, navigeer naar de inlogpagina
      this.router.navigate(['/login']);
    }

      this.subscription = this.shopService.list().subscribe((results) => { //subscribe to the list() observable, haal de shop op
          console.log(`results: ${results}`);
          this.shops = results;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
}