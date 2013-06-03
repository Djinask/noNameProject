//
//  LoginViewController.h
//  aMuse
//
//  Created by simone on 10/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ASIFormDataRequest.h"

@class LoginViewController;
@class FirstViewController;



@interface LoginViewController : UITableViewController <UITextFieldDelegate, ASIHTTPRequestDelegate>

@property (strong, nonatomic) IBOutlet UITextField *emailTextField;
@property (strong, nonatomic) IBOutlet UITextField *passwordTextField;

- (IBAction)tentaLogin;


@end
