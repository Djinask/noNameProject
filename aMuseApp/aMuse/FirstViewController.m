//
//  AggiungiViewController.m
//  aMuse
//
//  Created by simone on 09/05/13.
//  Copyright (c) 2013 simone. All rights reserved.
//

#import "FirstViewController.h"
#import "LoginViewController.h"
#import "UploadPhotoViewController.h"

@interface FirstViewController (){
    NSString *email;
    NSString *password;
    NSString *urlCorretto;
    UIImage *image;
    NSArray *welcomePhoto;
    int photoCount;
}
@end

@implementation FirstViewController 

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    self.navigationController.navigationBar.tintColor = [UIColor blackColor];
    
    urlCorretto = [NSString stringWithFormat:@"http://a-muse.herokuapp.com/photobook"];
    welcomePhoto = [NSArray arrayWithObjects:@"Beach",@"City", @"Snake",
                    //@"Ghiaccio",
                    @"Pyramid",
                    @"Thunder",
                    nil];
    
    self.slideShow.image = [UIImage imageNamed:[welcomePhoto objectAtIndex:0]];
    [NSTimer scheduledTimerWithTimeInterval:5.0 target:self selector:@selector(transitionPhotos) userInfo:nil repeats:YES];
}


-(void)transitionPhotos{
  //  if(loggedIn){
        if (photoCount < [welcomePhoto count] - 1){
            photoCount++;
        }else{
            photoCount = 0;
        }
    [UIView transitionWithView:self.slideShow
                      duration:2.0
                       options:UIViewAnimationOptionTransitionCrossDissolve
                    animations:^{ self.slideShow.image = [UIImage imageNamed:[welcomePhoto objectAtIndex:photoCount]];}
                    completion:NULL];
        
  //  }
}

- (void)viewDidAppear:(BOOL)animated{
        email = [[NSUserDefaults standardUserDefaults] valueForKey:@"email"];
        password = [[NSUserDefaults standardUserDefaults] valueForKey:@"password"];
        if (email != nil && password != nil){
            NSURL *url = [NSURL URLWithString:@"http://a-muse.herokuapp.com/mobileapi/login"];
            ASIFormDataRequest *request = [ASIFormDataRequest requestWithURL:url];
            [request setRequestMethod:@"POST"];
            [request setPostValue:email forKey:@"email"];
            [request setPostValue:password forKey:@"password"];
            [request setPostValue:@"submit" forKey:@"post"];
            [request setDelegate:self];
            [request setTimeOutSeconds:8.0];
            [request startAsynchronous];
        } else {
            [self showLoginScreen];
        }
}

//mobileapi/geturl



- (void)showLoginScreen{
   [self performSegueWithIdentifier:@"LoginSegue" sender:nil];
}

-(void)requestFinished:(ASIHTTPRequest *)request{
    if([[request responseString]isEqualToString:@"fail"]){
        [self showLoginScreen];
    } else{
        NSLog(@"Login Corretto");
        NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
        NSArray *stringhe = [[request responseString] componentsSeparatedByString:@" "];
        NSString *link = [NSString stringWithFormat:@"http://a-muse.herokuapp.com/booklet/%@",[stringhe objectAtIndex:1]];
        [defaults setObject:[stringhe objectAtIndex:0] forKey:@"ID"];
        [defaults setObject:link forKey:@"Link"];
    }
}


-(void)requestFailed:(ASIHTTPRequest *)request{
    UIAlertView *error = [[UIAlertView alloc] initWithTitle:@"Errore di Connessione" message:@"Impossibile effettuare il login. Sicuro di essere connesso?" delegate:nil cancelButtonTitle:@"Ok" otherButtonTitles: nil];
    [error show];
    [self showLoginScreen];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (IBAction)shareStuff{
    NSArray *Items   = [NSArray arrayWithObjects:
                       [[NSUserDefaults standardUserDefaults] objectForKey:@"Link"],
                        nil];
    UIActivityViewController *ActivityView =[[UIActivityViewController alloc] initWithActivityItems:Items applicationActivities: nil];
    ActivityView.excludedActivityTypes = [NSArray arrayWithObjects:UIActivityTypePostToWeibo,UIActivityTypePrint,UIActivityTypeSaveToCameraRoll, UIActivityTypeCopyToPasteboard, UIActivityTypeAssignToContact, nil];
    [self presentViewController:ActivityView animated:YES completion:nil];
}
@end
