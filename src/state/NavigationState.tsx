import { observable, computed, action } from 'mobx';

export interface NavigationState {
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

class BasicNavigationState {
  @observable public drawerOpen: boolean = false;
  @action
  public openDrawer(): void {
    this.drawerOpen = true;
    console.log(this.drawerOpen);
  }
  @action
  public closeDrawer(): void {
    this.drawerOpen = false;
    console.log(this.drawerOpen);
  }
}

export const state: NavigationState = new BasicNavigationState();
